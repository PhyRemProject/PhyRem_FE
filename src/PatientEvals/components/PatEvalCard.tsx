import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import "../styles/patevals.css"
import {
    TextField,
    Button
} from '@material-ui/core';

import {
    faEye, faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PatientEvalInterface } from '../PatientEvalsActions';


interface PatientCardProps {
    data: PatientEvalInterface
}


function PatEvalCard(props: PatientCardProps) {

    return (
        <div className="pateval-card">
            <Row className="h-100 ">
                <Col sm={2} className="h-100">
                    <FontAwesomeIcon icon={faPaperclip} className="h-50 w-50" />
                </Col>
                <Col sm={3} className="h-100">
                    <span className="align-middle h-100">
                        {props.data.patientName}<br />
                        {props.data.patientEmail}
                    </span>
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.creationDate}<br />
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.clinicDiagnosis}<br />
                </Col>
                <Col sm={2} className="h-100">
                    
                </Col>
                <Col sm={1} className="h-100">
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        component={Link}
                        to={"/dashboard/pateval/" + props.data._id}
                        onClick={() => { }}
                    >
                        <FontAwesomeIcon icon={faEye} id="eye-logo" />
                        <br />
                        {"Ver"}
                    </Button>
                </Col>

            </Row>
        </div>
    );
}

export default PatEvalCard;
