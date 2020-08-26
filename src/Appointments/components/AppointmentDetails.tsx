import React, { useState, useEffect, useMemo, Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import Button from "@material-ui/core/Button";

import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import AppointmentReducer, { AppointmentInterface } from "../AppointmentReducer"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "../styles/appointments.css"
import { getAppointsBetween, acceptAppoint, rejectAppoint, GetAppointPatEval } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import MapDialog from "../../Global/components/MapDialog"
import { PatientEvalInterface } from '../../PatientEvals/PatientEvalsActions';
import PatEvals from '../../PatientEvals/components/PatEvals';

interface AppointmentDetailsProps {
    appointment: AppointmentInterface
}


function ApoitmentDetails(props: AppointmentDetailsProps) {

    const [patEvalInfo, setPatEvalInfo] = useState<PatientEvalInterface>()
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [showMap, setShowMap] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (props.appointment.patientEval !== undefined)
            GetAppointPatEval(token, props.appointment.patientEval, setPatEvalInfo)
    }, [])

    const handleAcceptAppoint = () => {
        if (props.appointment)
            dispatch(
                acceptAppoint(
                    props.appointment,
                    token
                )
            )
    }

    const handleRejectAppoint = () => {
        if (props.appointment)
            dispatch(
                rejectAppoint(
                    props.appointment,
                    token
                )
            )

    }

    return (
        <>
            <MapDialog showMap={showMap} setShowMap={setShowMap} />
            <h5 id="details-title">Detalhes</h5>
            <div id="details-info" >

                {props.appointment !== undefined || props.appointment !== null ?
                    <Container fluid>
                        <Row>
                            <Col xs={12} className="appoint-patient-image">
                                <div className="center-content">

                                    <div style={{ height: "150px", width: "150px" }}>
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/api/patient/profileImage/${props.appointment.patientsInfo._id}`}
                                            roundedCircle
                                            fluid
                                            onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default_user_icon.png` }} />

                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-4">
                            <Col xs={6}>
                                <span className="appointment-data">
                                    Paciente
    <p>{props.appointment.patientsInfo.name}</p>
                                </span>
                                <span className="appointment-data">
                                    Contacto
    <p>{props.appointment.patientsInfo.phoneNumber}</p>
                                </span>
                                <span className="appointment-data">
                                    Localidade
    <p>{props.appointment.location}</p>
                                </span>
                            </Col>
                            <Col xs={6}>
                                <span className="appointment-data">
                                    Objectivo
    <p>{props.appointment.objective}</p>
                                </span>
                                <span className="appointment-data">
                                    Diagnóstico
    <p>{patEvalInfo?.clinicDiagnosis}</p>
                                </span>
                                <span className="appointment-data">
                                    Tratamento
                                    {
                                        patEvalInfo?.medicalPrescription.map((prescription, index: number) => {
                                            return <p key={index}>{prescription.prescription}</p>
                                        })
                                    }
                                </span>
                            </Col>
                        </Row>
                        {props.appointment.status === "REQUESTED" ?
                            <Row>
                                <Col xs={12}>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        onClick={handleAcceptAppoint}
                                    >
                                        Aceitar
                        </Button>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={handleRejectAppoint}
                                    >
                                        Rejeitar
                        </Button>

                                </Col>

                            </Row>
                            :
                            <Row>
                                <Col xs={6}>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={() => { setShowMap(true) }}
                                    >
                                        Ver Localização
</Button>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        component={Link}
                                        to={"/dashboard/patients/" + props.appointment.patientsInfo._id}
                                    >
                                        Ver Histórico do Paciente
</Button>

                                </Col>
                                <Col xs={6} >
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Registar Tratamento
</Button>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        component={Link}
                                        to={"/dashboard/pateval/new/" + props.appointment.patientsInfo._id}
                                    >
                                        Criar Avaliação de Paciente
</Button>
                                    <Button
                                        className="form-elems w-100 mt-2"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        component={Link}
                                        to={"/dashboard/physioeval/new/" + props.appointment.patientsInfo._id}
                                    >
                                        Criar Avaliação de Fisioterapeuta
</Button>
                                </Col>
                            </Row>

                        }
                    </Container>
                    :
                    <p>Seleccione uma consulta</p>
                }
            </div>
        </>

    )
}

export default ApoitmentDetails;