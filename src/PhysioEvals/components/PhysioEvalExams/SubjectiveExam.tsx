import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { SERVICE_URL } from "../../../constants";

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import PhysioEvalsReducer, { UPDATE_SUBJECTIVE_EXAM, PhysioEvalStateInterface, PhysioEvalInterface } from '../../PhysioEvalsReducer';
import {ExamProps} from "../NewPhysioEval"



function SubjectiveExam(props: ExamProps) {

    const [currentState, setCurrentState] = useState<string>("");
    const [previousIssues, setPreviousIssues] = useState<string>("");
    const [bodyChat, setBodyChat] = useState<number[]>([-1, -1]);
    const [intensity, setIntensity] = useState<number>(0);
    
    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.subjectiveExam)

    useEffect(() => {

        if (loadedExamState !== undefined && !props.saveExam) {
            setCurrentState(loadedExamState.currentState)
            setPreviousIssues(loadedExamState.previousIssues)
            setBodyChat([loadedExamState.bodyChat.x, loadedExamState.bodyChat.y])
            setIntensity(loadedExamState.bodyChat.intensity)
        }

    }, [])



    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_SUBJECTIVE_EXAM,
                payload: {
                    currentState,
                    previousIssues,
                    bodyChat: {
                        x: bodyChat[0],
                        y: bodyChat[1],
                        intensity
                    }
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])

    // currentState: string,
    // previousIssues: string,
    // bodyChat: {
    //     x: number,
    //     y: number,
    //     intensity: number
    // }

    function _onMouseMove(e: any) {
        setBodyChat([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
    }


    return (
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
                        <TextField
                            id="physioeval-description"
                            label=""
                            multiline
                            inputProps={{ style: { height: 150 } }}
                            variant="outlined"
                            value={currentState}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setCurrentState(event.target.value as string)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col sm={12} md={9}>
                        <InputLabel id="">Antecedentes Pessoais</InputLabel>
                        <TextField
                            id="physioeval-description"
                            label=""
                            multiline
                            inputProps={{ style: { height: 150 } }}
                            variant="outlined"
                            value={previousIssues}
                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                setPreviousIssues(event.target.value as string)
                            }}
                            className={"w-100"}
                        />
                    </Col>
                </Row>
            </Col>

            <Col sm={12} md={6} className={"mt-5"}>
                <Row className={"w-100"}>
                    <Col xs={12} className={"w-100 mb-5"}>

                        <div id={"bodyChat-container"} className={"w-100"}>
                            <Image
                                src={`${SERVICE_URL}/images/bodyChart.svg`}
                                id={"bodyChat-image"}
                                className="physioeval-bodychart"
                                onMouseDown={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                                    setBodyChat([event.nativeEvent.offsetX, event.nativeEvent.offsetY])
                                }}
                            />
                            {bodyChat[0] !== -1 ?
                                <Image
                                    src={`${SERVICE_URL}/images/target.png`}
                                    style={{
                                        top: bodyChat[1],
                                        left: bodyChat[0]
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

                        <Typography id="discrete-slider">
                            Intensidade
                        </Typography>
                        <Slider
                            defaultValue={5}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="on"
                            value={intensity}
                            onChange={(event: any, newValue: number | number[]) => {
                                setIntensity(newValue as number);
                            }}
                            step={1}
                            marks
                            min={1}
                            max={10}
                            className={"w-100 mt-5"}
                        />

                        <br />
                        <Button
                            className="form-elems"
                            variant="contained"
                            type="submit"
                            color="secondary"
                            onClick={() => { setBodyChat([-1, -1]); setIntensity(1) }}
                        >
                            {"Limpar BodyChat"}
                        </Button>

                    </Col>
                </Row>
            </Col>
        </Row>

    )


}

export default SubjectiveExam;