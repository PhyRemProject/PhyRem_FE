import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import moment from "moment"
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
    faEye,
    faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PatientEvalInterface } from '../../PatientEvals/PatientEvalsActions';

interface PatientHistoryCardProps {
    data: {
        type: string,
        value: PatientEvalInterface | any
    }
    setType: Function,
    setID: Function
}


function PatientHistoryCard(props: PatientHistoryCardProps) {


    return (
        <div className="patient-card">
            <Row className="h-100">
                <Col sm={2} className="h-100">
                    <FontAwesomeIcon icon={faPaperclip} className="h-50 w-50" />
                </Col>
                <Col sm={7} className="h-100">
                    {
                        props.data.type === "patEval" ?
                            <span className="align-middle h-100">
                                Avaliação de Paciente<br />
                                {props.data.value.clinicDiagnosis}<br />
                                {moment(props.data.value.creationDate).format("DD/MM/YYYY HH:mm")}
                            </span>
                            :
                            props.data.type === "physioEval" ?
                                <span className="align-middle h-100">
                                    Avaliação de Fisioterapeuta<br />
                                    {props.data.value.clinicDiagnosis}<br />
                                    {moment(props.data.value.creationDate).format("DD/MM/YYYY HH:mm")}
                                </span>
                                :
                                props.data.type === "exercise" ?
                                    <span className="align-middle h-100">
                                        Exercicio<br />
                                        {moment(props.data.value.creationDate).format("DD/MM/YYYY HH:mm")}
                                    </span>
                                    :
                                    <span className="align-middle h-100">
                                        {props.data.type}<br />
                                    </span>

                    }
                </Col>
                <Col sm={3} className="h-100">
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => {
                            props.setID(props.data.value._id)
                            props.setType(props.data.type)
                        }}
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

export default PatientHistoryCard;
