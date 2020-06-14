import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";



import moment from "moment"
import 'moment/locale/pt';

import Button from "@material-ui/core/Button";

import "../styles/appointment-card.css"
import UserReducer from '../../User/UserReducer';


interface AppointmentCardProps {
    data: {
        startDate: Date,
        endDate: Date,
        patientName: string,
        patientContact: string,
        patientAddress: string,
        objective: string,
        diagnostic: string,
        treatment: string
    }
}


function AppointmentCard(props: AppointmentCardProps) {

    let location = useLocation().pathname;

    return (
        <Container className="appointment-card">
            <Row>
                <Col xs={12} className="appointment-hour">
                    {moment(props.data.startDate).format("HH:MM")} - {moment(props.data.endDate).format("HH:MM")}
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <Image src={`${process.env.PUBLIC_URL}/images/default_user.png`} roundedCircle fluid />
                </Col>
                <Col xs={3}>
                    <span className="appointment-data">
                        Paciente
                        <p>{props.data.patientName}</p>
                    </span>
                    <span className="appointment-data">
                        Contacto
                        <p>{props.data.patientContact}</p>
                    </span>
                    <span className="appointment-data">
                        Localidade
                        <p>{props.data.patientAddress}</p>
                    </span>
                </Col>
                <Col xs={3}>
                    <span className="appointment-data">
                        Objectivo
                        <p>{props.data.objective}</p>
                    </span>
                    <span className="appointment-data">
                        Diagnóstico
                        <p>{props.data.diagnostic}</p>
                    </span>
                    <span className="appointment-data">
                        Tratamento
                        <p>{props.data.treatment}</p>
                    </span>
                </Col>
                <Col xs={3}>
                    <Button
                        className="form-elems w-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Ver Localização
                </Button>
                    <Button
                        className="form-elems w-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Ver Avaliação de Paciente
                </Button>
                    <Button
                        className="form-elems w-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Ir para consulta
                </Button>



                </Col>
            </Row>
        </Container >
    );

}

export default AppointmentCard;
