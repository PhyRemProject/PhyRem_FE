import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
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
    Button
} from '@material-ui/core';




function PatientCard() {

    return (
        <div className="patient-card">
            <Row className="">
                <Col sm={3} className={""}>
                    Patient Pic

                </Col>
                <Col sm={3}>
                    Info<br />
                     info<br />
                      info<br />
                </Col>
                <Col sm={3}>
                    Info<br />
                     info<br />
                      info<br />
                </Col>
                <Col sm={3}>
                    Info<br />
                     info<br />
                      info<br />
                </Col>
            </Row>
        </div>
    );
}

export default PatientCard;
