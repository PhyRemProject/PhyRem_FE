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
import PhysioEvalsReducer, { UPDATE_FUNCTIONAL_EXAM } from '../../PhysioEvalsReducer';
import { ExamProps } from '../NewPhysioEval';

function FunctionalExam(props : ExamProps) {

    const [observations, setObservations] = useState<string>("");

    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.functionalExam)

    useEffect(() => {
        if (loadedExamState !== undefined && !props.saveExam) {
            setObservations(loadedExamState.functionalExam)
        }
    }, [])


    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_FUNCTIONAL_EXAM,
                payload: {
                    functionalExam : observations
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])

    return (
        <Row>
            <Col>
                <Row className="mt-3">
                    <Col sm={12} md={3}>
                        <InputLabel id="">Exame Funcional</InputLabel>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col sm={12} md={3}>
                    </Col>
                    <Col sm={12} md={6}>
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
                    <Col sm={12} md={3}>
                    </Col>
                </Row>


            </Col>
        </Row>

    )


}

export default FunctionalExam;