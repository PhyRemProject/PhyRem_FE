import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
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
import { getAppointsBetween, acceptAppoint } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';


interface AppointmentDetailsProps {
    selectedAppoint: number | undefined,
    loadedAppoints: AppointmentInterface[]
}



function ApoitmentDetails(props: AppointmentDetailsProps) {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string


    const dispatch = useDispatch()

    const handleAcceptAppoint = () => {
        if (props.selectedAppoint)
            dispatch(
                acceptAppoint(
                    props.loadedAppoints[props.selectedAppoint]._id,
                    props.selectedAppoint,
                    token
                )
            )
    }


    const handleRejectAppoint = () => {

    }



    return (
        <>
            {props.selectedAppoint !== undefined ?
                <Container fluid>
                    <Row>
                        <Col xs={12} className="appoint-patient-image">
                            <Image src={`${process.env.PUBLIC_URL}/images/default_user.png`} roundedCircle fluid className="appoint-patient-image" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <span className="appointment-data">
                                Paciente
    <p>{props.loadedAppoints[props.selectedAppoint].patientsInfo.name}</p>
                            </span>
                            <span className="appointment-data">
                                Contacto
    <p>{props.loadedAppoints[props.selectedAppoint].patientsInfo.phoneNumber}</p>
                            </span>
                            <span className="appointment-data">
                                Localidade
    <p>{props.loadedAppoints[props.selectedAppoint].patientsInfo.address}</p>
                            </span>
                        </Col>
                        <Col xs={6}>
                            <span className="appointment-data">
                                Objectivo
    <p>{props.loadedAppoints[props.selectedAppoint].objective}</p>
                            </span>
                            <span className="appointment-data">
                                Diagnóstico
    <p>{props.loadedAppoints[props.selectedAppoint].diagnostic}</p>
                            </span>
                            <span className="appointment-data">
                                Tratamento
    <p>{props.loadedAppoints[props.selectedAppoint].treatment}</p>
                            </span>
                        </Col>
                    </Row>
                    {props.loadedAppoints[props.selectedAppoint].status === "REQUESTED" ?
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
                                >
                                    Ver Localização
</Button>
                                <Button
                                    className="form-elems w-100 mt-2"
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
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
                                >
                                    Criar Avaliação de Paciente
</Button>
                                <Button
                                    className="form-elems w-100 mt-2"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
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
        </>

    )
}

export default ApoitmentDetails;