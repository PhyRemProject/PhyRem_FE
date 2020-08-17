import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import "../../styles/physioevals.css"
import "../../styles/exams.css"
import {
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    Typography,
    Slider
} from '@material-ui/core';

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import PhysioEvalsReducer, { UPDATE_OBJECTIVE_EXAM } from '../../PhysioEvalsReducer';
import { ExamProps } from '../NewPhysioEval';


const articulationsTable = [
    {
        articulation: "Cotovelo",
        movement: [
            {
                movementName: "Flexão",
                angleRange: [0, 154]
            }
        ]
    },
    {
        articulation: "Antebraço",
        movement: [
            {
                movementName: "Pronoção",
                angleRange: [0, 90]
            },
            {
                movementName: "Supinação",
                angleRange: [0, 90]
            }
        ]
    },
]


interface Articulation {
    articulation: string,
    movement: string,
    adm: string,
    amplitude: number,
    endFeel: string
}

function ObjectiveExam(props : ExamProps) {

    const [observations, setObservations] = useState<string>("");
    const [articulation, setArticulation] = useState<number>(-1);
    const [movement, setMovement] = useState<number>(-1);
    const [adm, setADM] = useState<string>("");
    const [amplitude, setAmplitude] = useState<number>(0);
    const [endFeel, setEndFeel] = useState<string>("");

    const [addedArticulations, setAddedArticulations] = useState<Articulation[]>([])

    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.objectiveExam)

    useEffect(() => {
        if (loadedExamState !== undefined && !props.saveExam) {
            setObservations(loadedExamState.observations)
            setAddedArticulations(loadedExamState.articulations)
        }
    }, [])



    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_OBJECTIVE_EXAM,
                payload: {
                    observations,
                    articulations: addedArticulations
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])


    //Objective exam
    // observations: { type: String },
    // articulations: [
    //     {
    //         articulation: { type: String },
    //         movement: { type: String },
    //         adm: { type: String },
    //         amplitude: { type: Number },
    //         endFeel: { type: String }
    //     }
    // ],

    const handleAddArticulation = () => {
        if (amplitude !== undefined && endFeel !== undefined)
            setAddedArticulations(
                [...addedArticulations,
                {
                    articulation: articulationsTable[articulation].articulation,
                    movement: articulationsTable[articulation].movement[movement].movementName,
                    adm: articulationsTable[articulation].movement[movement].angleRange.toString(),
                    amplitude,
                    endFeel
                }]
            )

    }


    return (
        <Row>
            <Col>
                <Row className="mt-1">
                    <Col xs={8} className="physioeval-section-name">
                        Exame Objectivo
                </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={12} md={6}>
                        <InputLabel id="">Observações</InputLabel>
                        <TextField
                            id="physioeval-description"
                            label=""
                            multiline
                            inputProps={{ style: { height: 150 } }}
                            variant="outlined"
                            value={observations}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setObservations(event.target.value as string)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={12} md={3}>
                        <InputLabel id="">Exame Articular</InputLabel>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col sm={12} md={2} className={"mt-3"}>

                        <InputLabel id="">Articulação</InputLabel>

                        <Select
                            className={"w-100"}
                            labelId=""
                            id=""
                            required
                            value={articulation}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setMovement(-1)
                                setADM("")
                                console.log(event.target.value)
                                setArticulation(event.target.value as number)
                            }}
                        >

                            {articulationsTable.map((value, index) => (
                                <MenuItem key={index} value={index}>
                                    {value.articulation}
                                </MenuItem>
                            ))}
                        </Select>
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        {articulation !== -1 ?
                            <>
                                <InputLabel id="">Movimento</InputLabel>
                                <Select
                                    className={"w-100"}
                                    labelId=""
                                    id=""
                                    value={movement}
                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                        console.log(event.target.value)
                                        setMovement(event.target.value as number);
                                        setADM(articulationsTable[articulation].movement[event.target.value as number].angleRange.toString())
                                    }}
                                >

                                    {
                                        articulationsTable[articulation].movement.map((value, index) => {
                                            return (
                                                <MenuItem key={index} value={index}>
                                                    {value.movementName}
                                                </MenuItem>
                                            )
                                        })
                                    }

                                </Select>
                            </>
                            :
                            <></>
                        }
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        {articulation !== -1 && movement !== -1 ?
                            <>
                                <InputLabel id="">ADM</InputLabel>
                                <TextField
                                    id=""
                                    label=""
                                    variant="outlined"
                                    value={adm}
                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {

                                    }}
                                    className={"w-100"}
                                />
                            </>
                            :
                            <></>
                        }
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <InputLabel id="">Amplitude</InputLabel>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            type="number"
                            value={amplitude}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setAmplitude(event.target.value as number)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <InputLabel id="">EndFeel</InputLabel>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            value={endFeel}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setEndFeel(event.target.value as string)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <Button
                            className="w-100 h-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => handleAddArticulation()}
                        >
                            {"Adicionar"}
                        </Button>
                    </Col>
                </Row>

                <div className="mt-5 articular-exam-container">
                    {
                        addedArticulations.map((value: Articulation, index) => {
                            return (
                                <div key={index}>
                                    <Row className="articular-exam-registered">
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.articulation}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.movement}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.adm}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.amplitude}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.endFeel}
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>


            </Col>
        </Row>

    )


}

export default ObjectiveExam;