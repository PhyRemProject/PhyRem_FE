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
    Checkbox,
    Typography,
    Slider
} from '@material-ui/core';

import {
    faSave
} from "@fortawesome/free-solid-svg-icons";


import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PatientReducer from '../../Patients/PatientReducer';
import { submitNewPhysioEval, PatientEvalInterface, PrescriptionInterface } from '../PhysioEvalsActions';
import { GetAdoptedPatientList } from '../../Patients/PatientActions';
import SubjectiveExam from "./PhysioEvalExams/SubjectiveExam";
import ObjectiveExam from "./PhysioEvalExams/ObjectiveExam";
import MuscularExam from './PhysioEvalExams/MuscularExam';
import PerimeterExam from './PhysioEvalExams/PerimeterExam';
import PosturalExam from './PhysioEvalExams/PosturalExam';
import FunctionalExam from './PhysioEvalExams/FunctionalExam';
import PhysioEvalsReducer, { PhysioEvalInterface, UPDATE_SELECTED_PATIENT } from '../PhysioEvalsReducer';

interface NewPatEvalProps {
    patientID: string
}

export interface ExamProps {
    saveExam: boolean,
    isSaved: Function
}

//Number of exams in a physio evaluation 
const numOfExams = 6;

function NewPhysioEval(props: NewPatEvalProps) {
    
    const patientsList = useSelector((state: PatientReducer) => state.PatientReducer.physiciansPatients) as PatientInterface[]
    const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(-1);
    const [selectedPatient, setSelectedPatient] = useState<PatientInterface | null>(null);
    
    const completeExam = useSelector((state: PhysioEvalsReducer) => state.PhysioEvalsReducer.physioEval) as PhysioEvalInterface

    //CurrentExam is the exam being displayed
    const [currentExam, setCurrentExam] = useState<number>(0);
    //SaveExam is the exam to be saved, this state is passed to the exam components
    //  so that they know if they are the ones being saved
    const [saveExam, setSaveExam] = useState<number>(-1)
    //IsSaved is passed to the exam components so that they can notify if their state
    //  has been updated here, on the parent's component
    const [isSaved, setIsSaved] = useState<boolean>(false)
    //State defined by the buttons to move forward or backwords on the exams so that the save
    //  functio know what to do. If direction is 1 it goes to the next exam, if it's -1 it goes to the previous, 0 remains
    const [direction, setDirection] = useState<number>(0);

    const [submitStatus, setSubmitStatus] = useState<string>("editing")

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAdoptedPatientList(token))
    }, [])

    //If a prop with patientID is received, the patient should automatically be set
    useEffect(() => {
        if (props.patientID !== "") {
            let patientIndex = patientsList.findIndex(element => element._id === props.patientID)
            setSelectedPatientIndex(patientIndex)
            setSelectedPatient(patientsList[patientIndex])
        }
    }, [])

    //In case an exam was saved it means that it was done being filled, therefore the following
    // action should be resseting the isSaved state and advance the displayed exam
    useMemo(() => {
        if (isSaved) {
            setIsSaved(false)
            setSaveExam(-1)
            setCurrentExam(currentExam + direction)
        }
    }, [isSaved])


    const handlePatientPicking = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPatientIndex(event.target.value as number)
        setSelectedPatient(patientsList[event.target.value as number])
        dispatch({
            type: UPDATE_SELECTED_PATIENT,
            payload: patientsList[event.target.value as number]._id
        })
    }

    const handleExamSubmit = () => {
        dispatch( () => { submitNewPhysioEval(token, completeExam, setSubmitStatus)})
    }


    return (
        <div className="physioeval-view">
            <Row className="physioeval-options">
                <Col sm={3} className={"p-0 pt-2"}>

                </Col>
                <Col sm={5}>
                    {submitStatus === "uploading" ?
                        <p>A Submeter ...</p>
                        : submitStatus === "complete" ?
                            <p>Guardado!</p> :
                            submitStatus === "error" ?
                                <p>Ocorreu um erro ao gravar!</p>
                                :
                                <></>
                    }
                </Col>
                <Col sm={2}>

                    {/* <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { }}
                    >
                        {"Guardar"}
                    </Button> */}
                </Col>
                <Col sm={2}>

                    <Link to={"/dashboard/pateval"}>
                        <Button
                            className="form-elems w-100 h-100 red-button"
                            variant="contained"
                            type="submit"
                            onClick={() => { }}
                        >
                            {"Cancelar"}
                        </Button>
                    </Link>
                </Col>
            </Row>



            <Row className="p-0 mt-2 physioeval-container">
                <Col xs={12} className="physioeval-content">
                    {
                        currentExam === 0 ?
                            <Row className="p-2">
                                <Col sm={12} md={6}>
                                    <Row>
                                        <Col xs={8}>
                                            <InputLabel id="">Paciente</InputLabel>
                                            <Select
                                                className={"w-100"}
                                                labelId=""
                                                id=""
                                                required
                                                value={selectedPatientIndex}
                                                onChange={handlePatientPicking}
                                            >
                                                {
                                                    patientsList.map((patient: PatientInterface, index: number) => {
                                                        return <MenuItem
                                                            value={index}
                                                            key={index}
                                                        >
                                                            {patient.name} - {patient.email}
                                                        </MenuItem>
                                                    })
                                                }

                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            :
                            <></>
                    }

                    {/* EXAMS */}
                    {
                        currentExam === 0 ?
                            <SubjectiveExam saveExam={(saveExam === 0)} isSaved={setIsSaved} />
                            : currentExam === 1 ?
                                <ObjectiveExam saveExam={(saveExam === 1)} isSaved={setIsSaved} />
                                : currentExam === 2 ?
                                    <MuscularExam saveExam={(saveExam === 2)} isSaved={setIsSaved} />
                                    : currentExam === 3 ?
                                        <PerimeterExam saveExam={(saveExam === 3)} isSaved={setIsSaved} />
                                        : currentExam === 4 ?
                                            <PosturalExam saveExam={(saveExam === 4)} isSaved={setIsSaved} />
                                            : currentExam === 5 ?
                                                <FunctionalExam saveExam={(saveExam === 5)} isSaved={setIsSaved} />
                                                :
                                                <></>
                    }

                    <Row className="p-2 mt-3 exam-nav-buttons">
                        <Col xs={5} sm={2}>
                            {
                                currentExam > 0 ?
                                    <Button
                                        className="form-elems w-100 h-100"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={() => {
                                            setSaveExam(currentExam)
                                            setDirection(-1)
                                        }}
                                    >
                                        {"< Exame Anterior"}
                                    </Button>
                                    : <></>
                            }
                        </Col>
                        <Col xs={2} sm={8} className="text-center">
                            {currentExam + 1} / {numOfExams}
                        </Col>
                        <Col xs={5} sm={2}>
                            {
                                currentExam < (numOfExams - 1) ?
                                    <Button
                                        className="form-elems w-100 h-100"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={() => {
                                            setSaveExam(currentExam)
                                            setDirection(1)
                                            //setCurrentExam(currentExam + 1)
                                        }}
                                    >
                                        {"Próximo Exame >"}
                                    </Button>
                                    :
                                    <Button
                                        className="form-elems w-100 h-100"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={() => {
                                            handleExamSubmit()
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faSave} className={"mr-2"} />
                                        {"Gravar Exame"}
                                    </Button>
                            }

                        </Col>
                    </Row>


                </Col>
            </Row >
        </div >
    );
}

export default NewPhysioEval;
