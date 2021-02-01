import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFrame, Canvas } from "react-three-fiber";
import { Switch, Route, Link } from "react-router-dom";
import history from '../../Global/components/history'
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import "../styles/patients.css"
import {
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';

import {
    faArrowAltCircleLeft,
    faSearch
} from "@fortawesome/free-solid-svg-icons";

import { SERVICE_URL } from "../../constants";


import PatientCard from "./PatientCard"
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../PatientReducer';
import { GetPatientInfoByID, AdoptPatient, DropPatient, GetPatientHistory } from '../PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PatientHistoryCard from './PatientHistoryCard';
import { PatientEvalInterface } from '../../PatientEvals/PatientEvalsActions';
import PatEvalInfo from '../../PatientEvals/components/PatEvalInfo';
import PhysioEvalInfo from '../../PhysioEvals/components/PhysioEvalInfo';
import Exercise from '../../Exercise/components/Exercise';


interface PatientInformationProps {
    patientID: string
}



function DropConfirmation(props: any) {

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Deixar Paciente?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Tem a certeza que quer deixar o paciente?
      </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Não
      </Button>
                <Button onClick={() => {
                    props.dropPatient()
                    props.handleClose()
                }} color="primary" autoFocus>
                    Sim
      </Button>
            </DialogActions>
        </Dialog>
    )
}

function PatientInformation(props: PatientInformationProps) {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const physicianID = useSelector((state: UserReducer) => state.UserReducer.user?._id) as string
    const activePatient = useSelector((state: PatientReducer) => state.PatientReducer.activePatient)
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching)

    const [patientHistory, setPatientHistory] = useState([])
    const [fetchStatus, setFetchStatus] = useState<string>()
    const [selectedHistoryType, setSelectedHistoryType] = useState<string>("")
    const [selectedHistoryID, setSelectedHistoryID] = useState<string>("")

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        dispatch(GetPatientInfoByID(token, props.patientID))
    }, [])

    useMemo(() => {
        if (activePatient !== null && activePatient !== undefined)
            GetPatientHistory(token, activePatient._id as string, setPatientHistory, setFetchStatus)
    }, [activePatient])

    const dropPatient = () => {
        dispatch(DropPatient(token, (activePatient?._id as string), physicianID))
    }



    return (
        <div className="patient-view">
            <DropConfirmation open={open} setOpen={setOpen} handleClickOpen={() => { setOpen(true) }} handleClose={() => { setOpen(false) }} dropPatient={dropPatient} />
            <Row className="patient-list-options">
                <Col sm={1}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} className={"h-100"} style={{ color: "#6C63FF", width: "25px" }} onClick={history.goBack} />
                </Col>
                <Col sm={5}>
                    {isFetching ? <p>A Carregar ...</p> : <></>}
                </Col>
                <Col sm={2}>
                    <Link to={"/dashboard/pateval/new/" + activePatient?._id}>
                        <Button
                            className="form-elems h-100 w-100"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => { }}
                        >
                            {"Criar Avaliação de Paciente"}
                        </Button>
                    </Link>
                </Col>
                <Col sm={2}>
                    <Link to={"/dashboard/physioeval/new/" + activePatient?._id}>

                        <Button
                            className="form-elems h-100 w-100"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => { }}
                        >
                            {"Criar Avaliação de Fisioterapeuta"}
                        </Button>
                    </Link>
                </Col>
                {activePatient?.physicians?.includes(physicianID) ?
                    <Col sm={2}>
                        <Button
                            id="red-button"
                            className="form-elems h-100 w-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => {
                                setOpen(true)
                                //dispatch(DropPatient(token, (activePatient?._id as string), physicianID))
                            }}
                        >
                            {"Deixar Paciente"}
                        </Button>
                    </Col>
                    :
                    <Col sm={2}>
                        <Button
                            className="form-elems h-100 w-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => {
                                dispatch(AdoptPatient(token, (activePatient?._id as string), physicianID))
                            }}
                        >
                            {"Associar Paciente"}
                        </Button>
                    </Col>
                }


            </Row>


            <Row className="p-0 mt-2 mr-1">
                {
                    !activePatient ?
                        <>Paciente com id {props.patientID} não encontrado</> :

                        <Col xs={12} className={"patient-details-container p-0"}>

                            <Row className={"patient-information-container"}>
                                <Col sm={4} id={"top-left"}>
                                    <Row>
                                        <Col xs={12} className="center-content mt-3">
                                            <div style={{ height: "100px", width: "100px" }}>
                                                <Image
                                                    className="user-image"
                                                    src={`${SERVICE_URL}/api/patient/profileImage/${activePatient._id}`}
                                                    roundedCircle
                                                    fluid
                                                    onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default_user_icon.png` }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} className="text-center">
                                            <div id={"patient-name-email"}>
                                                <h5>{activePatient.name}</h5>
                                                <small>{activePatient.email}</small>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={8} className={"patient-information-container"} id={"top-right"}>
                                    <Row className={"h-100"}>
                                        <Col xs={4} className={"my-auto"}>

                                            <span className="patient-info-data">
                                                Endereço
                                                <p>{activePatient?.address}</p>
                                            </span>
                                            <span className="patient-info-data">
                                                Localidade
                                                <p>VALUE NOT DEFINED YET</p>
                                            </span>
                                            <span className="patient-info-data">
                                                Código-Postal
                                                <p>{activePatient?.address}</p>
                                            </span>
                                        </Col>
                                        <Col xs={4} className={"my-auto"}>
                                            <span className="patient-info-data">
                                                Data de Nascimento
                                                <p>{moment(activePatient?.birthDate).format("DD/MM/YYYY")}</p>
                                            </span>
                                            <span className="patient-info-data">
                                                Género
                                                <p>{activePatient?.gender}</p>
                                            </span>
                                            <span className="patient-info-data">
                                                Data de Registo
                                                <p>VALUE NOT DEFINED YET</p>
                                            </span>

                                        </Col>
                                        <Col xs={4} className={"my-auto"}>
                                            <span className="patient-info-data">
                                                Fisioterapeutas Associados
                                                <p>{activePatient?.physicians}</p>
                                            </span>

                                        </Col>
                                    </Row>

                                </Col>
                            </Row>
                            <Row className={"patient-history-container"}>
                                <Col sm={4} className={"patient-history-container"} id={"bottom-left"}>
                                    <div className={"patient-history-header"}>
                                        Histórico
                            </div>
                                    <div className={"patient-history-content"}>
                                        {
                                            fetchStatus === "loading" ?
                                                <p>A Carregar ...</p>
                                                :
                                                fetchStatus === "error" ?
                                                    <p>Ocorreu um erro a carregar o histórico</p>
                                                    :
                                                    fetchStatus === "complete" ?
                                                        patientHistory !== undefined ?
                                                            patientHistory.map((value: any, index: number) => {
                                                                return (
                                                                    <PatientHistoryCard
                                                                        data={{
                                                                            type: value.type,
                                                                            value
                                                                        }}
                                                                        setType={setSelectedHistoryType}
                                                                        setID={setSelectedHistoryID}
                                                                        key={index}
                                                                    />
                                                                )
                                                            })
                                                            :
                                                            <p>Ocorreu um erro a carregar o histórico</p>
                                                        :
                                                        <p>Ocorreu um erro a carregar o histórico</p>
                                        }
                                    </div>
                                </Col>
                                <Col sm={8} className={"patient-history-container"} id={"bottom-right"}>
                                    <div className={"patient-history-content"}>

                                        {
                                            selectedHistoryType === "patEval" ?
                                                <PatEvalInfo patEvalID={selectedHistoryID} noHeader key={selectedHistoryID} />
                                                :
                                                selectedHistoryType === "physioEval" ?
                                                    <PhysioEvalInfo physioEvalID={selectedHistoryID} noHeader key={selectedHistoryID} />
                                                    :
                                                    selectedHistoryType === "exercise" ?
                                                        <Exercise fullInterface={false} id={selectedHistoryID} key={selectedHistoryID} />
                                                        :
                                                        <p>Seleccione um registo</p>
                                        }


                                    </div>
                                </Col>
                            </Row>

                        </Col>
                }
            </Row>
        </div>
    );
}

export default PatientInformation;
