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
import PhysioEvalsReducer, { UPDATE_POSTURAL_EXAM } from '../../PhysioEvalsReducer';
import { ExamProps } from '../NewPhysioEval';


const postureList = [
    "Cervical",
    "Dorsal/Torax",
    "Lombar",
    "Bacia",
    "Joelhos",
    "Pé"
]


interface Posture {
    posture: string,
    below: number,
    above: number
}

function PosturalExam(props : ExamProps) {

    const [posture, setPosture] = useState<number>(-1);
    const [below, setBelow] = useState<number>(0);
    const [above, setAbove] = useState<number>(0);

    const [addedPostures, setAddedPostures] = useState<Posture[]>([])


    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.posturalExam)

    useEffect(() => {
        if (loadedExamState !== undefined && !props.saveExam) {
            setAddedPostures(loadedExamState.postural)
        }
    }, [])


    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_POSTURAL_EXAM,
                payload: {
                    postural : addedPostures
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])


    const handleAddPosture = () => {
        if (posture !== undefined && below !== undefined && above !== undefined)
            setAddedPostures(
                [...addedPostures,
                {
                    posture: postureList[posture],
                    below,
                    above

                }]
            )

    }


    return (
        <Row>
            <Col>
                <Row className="mt-3">
                    <Col sm={12} md={3}>
                        <InputLabel id="">Exame Postural</InputLabel>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col sm={12} md={2}>
                    </Col>

                    <Col sm={12} md={2} className={"mt-3"}>

                        <InputLabel id="">Postura</InputLabel>

                        <Select
                            className={"w-100"}
                            labelId=""
                            id=""
                            required
                            value={posture}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setAbove(0)
                                setBelow(0)
                                setPosture(event.target.value as number)
                            }}
                        >

                            {postureList.map((value, index) => (
                                <MenuItem key={index} value={index}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <InputLabel id="">Anterior</InputLabel>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            type="number"
                            value={below}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setBelow(event.target.value as number)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                    <Col sm={12} md={2} className={"mt-3"}>
                        <InputLabel id="">Posterior</InputLabel>
                        <TextField
                            id=""
                            label=""
                            variant="outlined"
                            type="number"
                            value={above}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setAbove(event.target.value as number)
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
                            onClick={() => handleAddPosture()}
                        >
                            {"Adicionar"}
                        </Button>
                    </Col>
                    <Col sm={12} md={2}>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col sm={12} md={2}>
                    </Col>
                    <Col sm={12} md={8}>
                        <div className="articular-exam-container">
                            {
                                addedPostures.map((value: Posture, index) => {
                                    return (
                                        <div key={index}>
                                            <Row className="articular-exam-registered">
                                                <Col sm={12} md={3} className={"mt-1"}>
                                                    {value.posture}
                                                </Col>
                                                <Col sm={12} md={3} className={"mt-1"}>
                                                    {value.below}
                                                </Col>
                                                <Col sm={12} md={3} className={"mt-1"}>
                                                    {value.above}
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col sm={12} md={2}>
                    </Col>
                </Row>



            </Col>
        </Row>

    )


}

export default PosturalExam;