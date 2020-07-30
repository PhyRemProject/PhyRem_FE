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
    Button,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core';


import UserReducer from '../../User/UserReducer';
import { GetPatEval, PatientEvalInterface } from '../PatientEvalsActions';

interface PatEvalInfoProps {
    patEvalID: string
}


function PatEvalInfo(props: PatEvalInfoProps) {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [patEval, setPatEval] = useState<PatientEvalInterface>()
    const [fetchStatus, setFetchStatus] = useState<string>()

    const dispatch = useDispatch();

    useEffect(() => {
        GetPatEval(token, props.patEvalID, setPatEval, setFetchStatus)
    }, [])

    console.log(patEval)

    return (
        <div className="pateval-view">
            <Row className="pateval-options">
                <Col sm={3} className={"p-0 pt-2"}>
                    <Link to={"/dashboard/pateval"}>Voltar</Link>
                </Col>
                <Col sm={5}>

                </Col>
                <Col sm={2}>

                </Col>
                <Col sm={2}>

                </Col>
            </Row>


            {
                fetchStatus === "loading" ?
                    <p>A Carregar ...</p>
                    :
                    fetchStatus === "error" ?
                        <p>Ocorreu um erro a carregar a avaliação de id : {props.patEvalID}</p>
                        :
                        patEval !== undefined ?
                            <>
                                <Row className="p-0 mt-2 pateval-container">
                                    <Col xs={12} className="pateval-content">
                                        <Row className="h-100 p-2">
                                            <Col xs={12}>
                                                <Row>
                                                    <Col xs={4}>
                                                        <InputLabel id="">Paciente</InputLabel>
                                                        {patEval.patientName}
                                                        <br />
                                                        {patEval.patientEmail}
                                                    </Col>
                                                </Row>

                                                <Row className="mt-5">
                                                    <Col xs={4}>
                                                        <InputLabel id="">Diagnóstico Clinico</InputLabel>
                                                        {patEval.clinicDiagnosis}
                                                    </Col>
                                                </Row>
                                                <Row className="mt-5">
                                                    <Col xs={4}>
                                                        <InputLabel id="">Descrição</InputLabel>
                                                        {patEval.description}
                                                    </Col>
                                                </Row>


                                                <Row className="mt-5">
                                                    <Col xs={3}>
                                                        <InputLabel id="">Prescrição Médica</InputLabel>
                                                    </Col>
                                                    <Col xs={3}>
                                                        <InputLabel id="">Opções</InputLabel>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <InputLabel id="">Número de Tratamentos</InputLabel>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <InputLabel id="">Frequência do Tratamento</InputLabel>
                                                    </Col>
                                                    <Col xs={2}>
                                                    </Col>
                                                </Row>

                                                {
                                                    patEval.medicalPrescription.map((value: any, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <Row className="mt-5">
                                                                    <Col xs={3}>
                                                                        {value.prescription}
                                                                    </Col>
                                                                    <Col xs={3}>
                                                                        {value.prescriptionOption.map((value: any, index: any) => {
                                                                            return (
                                                                                <div key={index}>
                                                                                    {value}
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </Col>
                                                                    <Col xs={2}>

                                                                        {value.numOfTreatments}
                                                                    </Col>
                                                                    <Col xs={2}>

                                                                        {value.treatmentFreq}
                                                                    </Col>
                                                                    <Col xs={2}>
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        )
                                                    })
                                                }

                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                            :
                            <p>Ocorreu um erro a carregar a avaliação de id : {props.patEvalID}</p>
            }

        </div>

    );
}

export default PatEvalInfo;
