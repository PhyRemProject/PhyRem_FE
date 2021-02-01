import React, { useState, useEffect, useMemo } from 'react';
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
    Button
} from '@material-ui/core';

import {
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SERVICE_URL } from "../../constants";

interface PatientCardProps {
    data: {
        id: string,
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
                <Col sm={2} className="h-100">
                    <div className="center-content">
                        <div style={{ height: "100px", width: "100px" }}>
                            <Image
                                className="user-image"
                                src={`${SERVICE_URL}/api/patient/profileImage/${props.data.id}`}
                                fluid
                                roundedCircle
                                onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default_user_icon.png` }} />
                        </div>
                    </div>

                </Col>
                <Col sm={3} className="h-100">
                    <span className="align-middle h-100">
                        {props.data.name}<br />
                        {props.data.email}
                    </span>
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.contact}<br />
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.address}<br />
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.gender}<br />
                </Col>
                <Col sm={1} className="h-100">
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        component={Link}
                        to={"/dashboard/patients/" + props.data.id}
                        onClick={() => { }}
                    >
                        <FontAwesomeIcon icon={faEye} id="eye-logo" />
                        <br />
                        {"Ver"}
                    </Button>
                </Col>

            </Row>
        </div >
    );
}

export default PatientCard;
