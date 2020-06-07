import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import moment from "moment"
import 'moment/locale/pt';

import "../styles/appointment-card.css"

function AppointmentCard() {

    return (
        <Container className="appointment-card">
            <Row>
                <Col xs={12}>
                    11h00 - 12h00
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <img className="appointment patient-image" src={"images/default_user.png"} />
                </Col>
                <Col xs={4}>
                    <span className="appointment-data">
                        Paciente
                        <p>Eduardo Silva</p>
                    </span>
                    <span className="appointment-data">
                        Contacto
                        <p>+351 912 568 798</p>
                    </span>
                    <span className="appointment-data">
                        Localidade
                        <p>Lumiar, Lisboa</p>
                    </span>
                </Col>
            </Row>
        </Container >
    );

}

export default AppointmentCard;
