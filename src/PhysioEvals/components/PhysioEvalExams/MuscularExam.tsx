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
import { ExamProps } from '../NewPhysioEval';
import PhysioEvalsReducer, { UPDATE_MUSCULAR_EXAM } from '../../PhysioEvalsReducer';


const muscleTable = [
    {
        muscle: "Punho",
        movement: [
            {
                movementName: "Extensão",
                angleRange: [0, 154]
            }
        ]
    },
    {
        muscle: "Cotovelo",
        movement: [
            {
                movementName: "Extensão",
                angleRange: [0, 90]
            },
            {
                movementName: "Flexão",
                angleRange: [0, 90]
            }
        ]
    },
]


export interface Muscle {
    muscle: string,
    movement: string,
    adm: string,
    intensity: string,
}

function MuscularExam(props : ExamProps) {

    const [muscle, setMuscle] = useState<number>(-1);
    const [movement, setMovement] = useState<number>(-1);
    const [adm, setADM] = useState<number[]>([]);
    const [intensity, setIntensity] = useState<string>("");

    const [addedMuscles, setAddedMuscles] = useState<Muscle[]>([])

    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.muscularExam)

    useEffect(() => {
        if (loadedExamState !== undefined && !props.saveExam) {
            setAddedMuscles(loadedExamState.muscles)
        }
    }, [])



    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_MUSCULAR_EXAM,
                payload: {
                    muscles: addedMuscles
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])



    // muscles: [
    //     {
    //         muscle: { type: String },
    //         movement: { type: String },
    //         adm: { type: String },
    //         intensity: { type: Number },
    //     }
    // ],


    const handleAddMuscle = () => {
        if (muscle !== undefined && movement !== undefined && intensity !== undefined)
            setAddedMuscles(
                [...addedMuscles,
                {
                    muscle: muscleTable[muscle].muscle,
                    movement: muscleTable[muscle].movement[movement].movementName,
                    adm: muscleTable[muscle].movement[movement].angleRange.toString(),
                    intensity
                }]
            )

    }


    return (
        <Row>
            <Col>
                <Row className="mt-3">
                    <Col sm={12} md={3}>
                        <InputLabel id="">Exame Muscular</InputLabel>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={12} md={2} className={"mt-3"}>

                        <InputLabel id="">Músculo</InputLabel>

                        <Select
                            className={"w-100"}
                            labelId=""
                            id=""
                            required
                            value={muscle}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setMovement(-1)
                                setADM([])
                                console.log(event.target.value)
                                setMuscle(event.target.value as number)
                            }}
                        >

                            {muscleTable.map((value, index) => (
                                <MenuItem key={index} value={index}>
                                    {value.muscle}
                                </MenuItem>
                            ))}
                        </Select>
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        {muscle !== -1 ?
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
                                        setADM(muscleTable[muscle].movement[event.target.value as number].angleRange)
                                    }}
                                >
                                    {
                                        muscleTable[muscle].movement.map((value, index) => {
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
                        {muscle !== -1 && movement !== -1 ?
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
                        <InputLabel id="">Intensidade</InputLabel>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            type="number"
                            value={intensity}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setIntensity(event.target.value as string)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>

                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <Button
                            className="w-100 h-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => handleAddMuscle()}
                        >
                            {"Adicionar"}
                        </Button>
                    </Col>
                </Row>

                <div className="mt-5 articular-exam-container">
                    {
                        addedMuscles.map((value: Muscle, index) => {
                            return (
                                <div key={index}>
                                    <Row className="articular-exam-registered">
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.muscle}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.movement}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.adm}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
                                            {value.intensity}
                                        </Col>
                                        <Col sm={12} md={2} className={"mt-1"}>
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

export default MuscularExam;