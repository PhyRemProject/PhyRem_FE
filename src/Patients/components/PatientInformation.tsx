import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFrame, Canvas } from "react-three-fiber";
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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


import PatientCard from "./PatientCard"
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../PatientReducer';
import { GetPatientInfoByID, AdoptPatient, DropPatient } from '../PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface PatientInformationProps {
    patientID: string
}


function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => ((mesh.current as any).rotation.x = (mesh.current as any).rotation.y += 0.01))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(e) => setActive(!active)}
            onPointerOver={(e) => setHover(true)}
            onPointerOut={(e) => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
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

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(GetPatientInfoByID(token, props.patientID))
    }, [])


    const dropPatient = () => {
        dispatch(DropPatient(token, (activePatient?._id as string), physicianID))
    }

    return (
        <div className="patient-view">
            <DropConfirmation open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} dropPatient={dropPatient}/>
            <Row className="patient-list-options">
                <Col sm={1}>
                    <Link to={"/dashboard/patients"} className={"h-100"}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className={"h-100"} />
                    </Link>
                </Col>
                <Col sm={5}>
                    {isFetching ? <p>A Carregar ...</p> : <></>}
                </Col>
                <Col sm={2}>
                    <Button
                        className="form-elems h-100 w-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { }}
                    >
                        {"Criar Avaliação de Paciente"}
                    </Button>
                </Col>
                <Col sm={2}>
                    <Button
                        className="form-elems h-100 w-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { }}
                    >
                        {"Criar Avaliação de Fisioterapeuta"}
                    </Button>
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
                                handleClickOpen();
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
                                <Col sm={4} className={"patient-information-container text-center"} id={"top-left"}>
                                    <br />
                                    <Image src={`${process.env.PUBLIC_URL}/images/default_user.png`} roundedCircle fluid id="patient-info-image" />
                                    <br />
                                    <div id={"patient-name-email"}>
                                        <h5>{activePatient.name}</h5>
                                        <small>{activePatient.email}</small>
                                    </div>
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
                                                <p>{activePatient?.birthDate}</p>
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
                                            {/* <span className="patient-info-data">
                                        Paciente
                                        <p>asdasd</p>
                                    </span>
                                    <span className="patient-info-data">
                                        Paciente
                                        <p>asdasd</p>
                                    </span> */}

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
                                    </div>
                                </Col>
                                <Col sm={8} className={"patient-history-container"} id={"bottom-right"}>
                                    <div className={"patient-history-content"}>

                                        <Canvas>
                                            <ambientLight />
                                            <pointLight position={[10, 10, 10]} />
                                            <Box position={[-1.2, 0, 0]} />
                                            <Box position={[1.2, 0, 0]} />
                                        </Canvas>

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
