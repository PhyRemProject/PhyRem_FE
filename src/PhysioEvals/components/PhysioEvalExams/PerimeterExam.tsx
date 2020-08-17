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
import PhysioEvalsReducer, { UPDATE_PERIMETER_EXAM } from '../../PhysioEvalsReducer';
import { ExamProps } from '../NewPhysioEval';


const perimeterAreas = [
    "Art, M/F",
    "Transcarpica",
    "AE Cubito",
    "_cm abaixo da prega",
    "_cm abaixo da prega",
    "Prega Cotovelo",
    "_cm acima da prega",
    "_cm acima da prega",
    "Raiz do membro"
]

interface PerimeterArea {
    bodyPart: string,
    rightMeasure: number,
    leftMeasure: number,
    difference: number,
    reeval1: number,
    reeval2: number,
    reevalFinal: number

}

function PerimeterExam(props : ExamProps) {

    const emptyArea = {
        bodyPart: "",
        rightMeasure: 0,
        leftMeasure: 0,
        difference: 0,
        reeval1: 0,
        reeval2: 0,
        reevalFinal: 0
    }

    const createEmptyAreas = () => {
        let tempEmpties: PerimeterArea[] = [];
        perimeterAreas.forEach(element => {
            tempEmpties.push({
                ...emptyArea,
                bodyPart: element
            })
        });
        return tempEmpties;
    }

    const [areasValues, setAreasValues] = useState<PerimeterArea[]>(createEmptyAreas());

    const dispatch = useDispatch();
    const loadedExamState = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.perimeterExam)

    useEffect(() => {
        if (loadedExamState !== undefined && !props.saveExam) {
            setAreasValues(loadedExamState.perimeter)
        }
    }, [])



    //This useEffect is always triggered, it is used to verify if it is being requested that
    //  this exam's state should be stored, if so then save the state to the parent's state or to Redux
    //  and notify that the state has finished being stored
    useEffect(() => {
        if (props.saveExam) {

            dispatch({
                type: UPDATE_PERIMETER_EXAM,
                payload: {
                    perimeter : areasValues
                }
            })

            props.isSaved(true)
        }
    }, [props.saveExam])


    // bodyPart: { type: String },
    // rightMeasure: { type: Number },
    // leftMeasure: { type: Number },
    // difference: { type: Number },
    // reeval1: { type: Number },
    // reeval2: { type: Number },
    // reevalFinal: { type: Number }

    return (
        <Row>
            <Col>
                <Row className="mt-3">
                    <Col sm={12} md={3}>
                        <InputLabel id="">Perimetria</InputLabel>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col sm={1} md={2} className={"mt-3"}>
                    </Col>
                    <Col sm={10} md={8} className={"mt-3"}>

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
                                    perimeterAreas.map((value, index) => {

                                        return (
                                            <tr key={index}>
                                                <th scope="row">{value}</th>
                                                <td></td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].rightMeasure}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        rightMeasure: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}
                                                        className={"w-100"}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].leftMeasure}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        leftMeasure: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}

                                                        className={"w-100"}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].difference}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        difference: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}

                                                        className={"w-100"}
                                                    />
                                                </td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].reeval1}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        reeval1: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}

                                                        className={"w-100"}
                                                    />

                                                </td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].reeval2}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        reeval2: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}

                                                        className={"w-100"}
                                                    />

                                                </td>
                                                <td>
                                                    <TextField
                                                        label=""
                                                        type={"number"}
                                                        value={areasValues[index].reevalFinal}
                                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                            setAreasValues(
                                                                [
                                                                    ...areasValues.slice(0, index),
                                                                    {
                                                                        ...areasValues[index],
                                                                        reevalFinal: event.target.value as number
                                                                    },
                                                                    ...areasValues.slice(index + 1)
                                                                ]
                                                            )
                                                        }}

                                                        className={"w-100"}
                                                    />

                                                </td>
                                            </tr>

                                        )

                                    })
                                }

                            </tbody>
                        </table>

                    </Col>
                    <Col sm={1} md={2} className={"mt-3"}>
                    </Col>
                </Row>

            </Col>
        </Row>

    )


}

export default PerimeterExam;