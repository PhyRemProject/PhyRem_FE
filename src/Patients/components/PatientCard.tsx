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

import {
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PatientCardProps {
    data: {
        name: string,
        email: string,
        contact: string,
        address: string,
        gender: string,
    }
    //TODO this has to be completed
}


function PatientCard(props: PatientCardProps) {

    return (
        <div className="patient-card">
            <Row className="h-100">
                <Col sm={2} className={""}>
                    <Image src={`${process.env.PUBLIC_URL}/images/default_user.png`} roundedCircle fluid />

                </Col>
                <Col sm={3} className="h-100">
                    <span className="align-middle h-100">
                        {props.data.name}<br />
                        {props.data.email}
                    </span>
                </Col>
                <Col sm={2}>
                    {props.data.contact}<br />
                </Col>
                <Col sm={2}>
                    {props.data.address}<br />
                </Col>
                <Col sm={2}>
                    {props.data.gender}<br />
                </Col>
                <Col sm={1}>
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => { }}
                    >
                        <FontAwesomeIcon icon={faEye} id="eye-logo" />
                        <br/>
                        {"Ver"}
                    </Button>
                </Col>

            </Row>
        </div>
    );
}

export default PatientCard;
