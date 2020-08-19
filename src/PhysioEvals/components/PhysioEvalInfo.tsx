import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import "../styles/physioevals.css"
import {
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core';


import UserReducer from '../../User/UserReducer';
import { GetPhysioEval } from '../PhysioEvalsActions';
import {
    faArrowAltCircleLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PhysioEvalInterface, PerimeterExam } from '../PhysioEvalsReducer';
import { Articulation } from '../components/PhysioEvalExams/ObjectiveExam';
import { Muscle } from '../components/PhysioEvalExams/MuscularExam';
import { PerimeterArea } from '../components/PhysioEvalExams/PerimeterExam';
import { Posture } from '../components/PhysioEvalExams/PosturalExam';

interface PhysioEvalInfoProps {
    physioEvalID: string
    noHeader?: boolean
}


function PhysioEvalInfo(props: PhysioEvalInfoProps) {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [physioEval, setPhysioEval] = useState<PhysioEvalInterface>()
    const [fetchStatus, setFetchStatus] = useState<string>()

    const dispatch = useDispatch();

    useEffect(() => {
        GetPhysioEval(token, props.physioEvalID, setPhysioEval, setFetchStatus)
    }, [])

    return (
        <div className="pateval-view">
            {
                !props.noHeader ?
                    <Row className="pateval-options">
                        <Col sm={3} className={"p-0 pt-2"}>
                            <Link to={"/dashboard/pateval"}>
                                <FontAwesomeIcon icon={faArrowAltCircleLeft} className={"h-100"} style={{ color: "#6C63FF", width: "25px" }} />
                            </Link>
                        </Col>
                        <Col sm={5}>

                        </Col>
                        <Col sm={2}>

                        </Col>
                        <Col sm={2}>

                        </Col>
                    </Row>
                    :
                    <></>
            }


            {
                fetchStatus === "loading" ?
                    <p>A Carregar ...</p>
                    :
                    fetchStatus === "error" ?
                        <p>Ocorreu um erro a carregar a avaliação de id : {props.physioEvalID}</p>
                        :
                        physioEval !== undefined ?
                            <>
                                <Row className="h-100 p-2">
                                    <Col xs={12}>
                                        <Row>
                                            <Col xs={4}>
                                                <InputLabel id=""><b>Paciente</b></InputLabel>
                                                {physioEval.patientName}
                                                <br />
                                                {physioEval.patientEmail}
                                            </Col>
                                        </Row>

                                        {
                                            //**SUBJECTIVE EXAM**//
                                        }
                                        <Row>
                                            <Col>
                                                <Row className="mt-5">
                                                    <Col xs={8} className="physioeval-section-name">
                                                        Exame Subjectivo
                                                    </Col>
                                                </Row>
                                                <Row className="mt-5">
                                                    <Col sm={12} md={9}>
                                                        <InputLabel id="">História Actual</InputLabel>

                                                        {physioEval.currentState}

                                                    </Col>
                                                </Row>
                                                <Row className="mt-5">
                                                    <Col sm={12} md={9}>
                                                        <InputLabel id="">Antecedentes Pessoais</InputLabel>
                                                        {physioEval.previousIssues}
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col sm={12} md={6} className={"mt-5"}>
                                                <Row className={"w-100"}>
                                                    <Col xs={12} className={"w-100 mb-5"}>

                                                        <div id={"bodyChat-container"} className={"w-100"}>
                                                            <Image
                                                                src={`${process.env.PUBLIC_URL}/images/bodyChart.svg`}
                                                                id={"bodyChat-image"}
                                                                className="physioeval-bodychart"

                                                            />
                                                            {physioEval.bodyChat.x !== -1 ?
                                                                <Image
                                                                    src={`${process.env.PUBLIC_URL}/images/default_user.png`}
                                                                    style={{
                                                                        top: physioEval.bodyChat.y,
                                                                        left: physioEval.bodyChat.x
                                                                    }}
                                                                    id={"bodyChat-indicator"}
                                                                /> :
                                                                <></>
                                                            }

                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className={"w-100"} style={{ marginTop: "340px" }}>
                                                    <Col sm={12} md={8} className={"w-100"}>
                                                        Intensidade: {physioEval.bodyChat.intensity}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        {
                                            /***********************************************************/
                                        }

                                        <Row>
                                            <Col>
                                                <Row className="mt-5">
                                                    <Col xs={8} className="physioeval-section-name">
                                                        Exame Objectivo
                                                        </Col>
                                                </Row>
                                                <Row className="mt-5">
                                                    <Col xs={12}>
                                                        <InputLabel>Observações</InputLabel>
                                                        <p className="mt-3">
                                                            {physioEval.observations}
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row className="mt-5">
                                                    <Col xs={12}>
                                                        <InputLabel>Exame Articular</InputLabel>
                                                        <div className="mt-5">
                                                            <table className={"table"}>
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Articulação</th>
                                                                        <th scope="col">Movimento</th>
                                                                        <th scope="col">ADM</th>
                                                                        <th scope="col">Amplitude</th>
                                                                        <th scope="col">EndFeel</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        physioEval.articulations.map((value: Articulation, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td >
                                                                                        {value.articulation}
                                                                                    </td>
                                                                                    <td >
                                                                                        {value.movement}
                                                                                    </td>
                                                                                    <td >
                                                                                        {value.adm}
                                                                                    </td>
                                                                                    <td >
                                                                                        {value.amplitude}
                                                                                    </td>
                                                                                    <td >
                                                                                        {value.endFeel}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        {
                                            /***********************************************************/
                                        }

                                        <Row className="mt-5">
                                            <Col xs={12}>
                                                <InputLabel>Exame Muscular</InputLabel>
                                                <div className="mt-5">
                                                    <table className={"table"}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Músculo</th>
                                                                <th scope="col">Movimento</th>
                                                                <th scope="col">ADM</th>
                                                                <th scope="col">Intensidade</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                physioEval.muscles.map((value: Muscle, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td >
                                                                                {value.muscle}
                                                                            </td>
                                                                            <td >
                                                                                {value.movement}
                                                                            </td>
                                                                            <td >
                                                                                {value.adm}
                                                                            </td>
                                                                            <td >
                                                                                {value.intensity}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                        </Row>

                                        {
                                            /***********************************************************/
                                        }

                                        <Row className="mt-5">
                                            <Col xs={12}>
                                                <InputLabel>Exame Muscular</InputLabel>
                                                <div className="mt-5">

                                                    <table className={"table"}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Perimetria</th>
                                                                <th scope="col"></th>
                                                                <th scope="col">MS dto</th>
                                                                <th scope="col">MS esq</th>
                                                                <th scope="col">Diferença</th>
                                                                <th scope="col">Reav</th>
                                                                <th scope="col">Reav</th>
                                                                <th scope="col">Reav. Final</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                physioEval.perimeter.map((value: PerimeterArea, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">{value.bodyPart}</th>
                                                                            <td></td>
                                                                            <td>
                                                                                {value.rightMeasure}
                                                                            </td>
                                                                            <td>
                                                                                {value.leftMeasure}
                                                                            </td>
                                                                            <td>
                                                                                {value.difference}
                                                                            </td>
                                                                            <td>
                                                                                {value.reeval1}
                                                                            </td>
                                                                            <td>
                                                                                {value.reeval2}
                                                                            </td>
                                                                            <td>
                                                                                {value.reevalFinal}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                        </Row>

                                        {
                                            /***********************************************************/
                                        }

                                        <Row className="mt-5">
                                            <Col xs={12}>
                                                <InputLabel>Exame Postural</InputLabel>
                                                <div className="mt-5">
                                                    <table className={"table"}>
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Postura</th>
                                                                <th scope="col">Anterior</th>
                                                                <th scope="col">Posterior</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                physioEval.postural.map((value: Posture, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td >
                                                                                {value.posture}
                                                                            </td>
                                                                            <td >
                                                                                {value.below}
                                                                            </td>
                                                                            <td >
                                                                                {value.above}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Col>
                                        </Row>


                                        {
                                            /***********************************************************/
                                        }

                                        <Row className="mt-5">
                                            <Col xs={12}>
                                                <InputLabel>Exame Funcional</InputLabel>
                                                <p>
                                                    {physioEval.functionalExam}
                                                </p>
                                            </Col>
                                        </Row>


                                    </Col>
                                </Row>
                            </>
                            :
                            <p>A Carregar ...</p>
            }

        </div>

    );
}

export default PhysioEvalInfo;
