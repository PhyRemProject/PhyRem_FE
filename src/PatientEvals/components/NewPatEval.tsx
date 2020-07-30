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

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";


import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PatientReducer from '../../Patients/PatientReducer';
import { createNewPatEval, PatientEvalInterface, PrescriptionInterface } from '../PatientEvalsActions';
import { GetAdoptedPatientList } from '../../Patients/PatientActions';


const diagnosisOptions = [
    "Tendinopatia",
    "Ruptura Muscular",
    "Entorse",
    "Fractura",
    "Neuropatia"
]

const medicalPrescriptions = [
    {
        prescription: "Agentes Físicos",
        options: ["Calor Húmido", "Gelo", "Parafinas", "Outro (Ver Descrição)"]
    },
    {
        prescription: "Fortalecimento Muscular",
        options: []
    },
    {
        prescription: "TEC - Técnicas Especiais de Cinesioterapia",
        options: ["PNF", "Manipulação"]
    },
    {
        prescription: "Electroestimulação",
        options: []
    },
    {
        prescription: "Mobilização Articular",
        options: []
    },
    {
        prescription: "Outro (Ver Descrição)",
        options: []
    },
]

interface NewPatEvalProps {
    patientID : string
}


function NewPatEval(props : NewPatEvalProps) {

    const patientsList = useSelector((state: PatientReducer) => state.PatientReducer.physiciansPatients) as PatientInterface[]
    const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(-1);
    const [selectedPatient, setSelectedPatient] = useState<PatientInterface | null>(null);

    const [clinicDiagnosis, setClinicDiagnosis] = useState<number>(-1);
    const [description, setDescription] = useState<string>("");
    const [prescription, setPrescription] = useState<number>(-1)
    const [prescriptionOption, setPrescriptionOption] = useState<string[]>([])
    const [numOfTreatments, setNumOfTreatments] = useState<number>(1)
    const [treatmentFreq, setTreatmentFreq] = useState<string>("")

    const [addedPrescriptions, setAddedPrescriptions] = useState<PrescriptionInterface[]>([])
    const [submitStatus, setSubmitStatus] = useState<string>("editing")


    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAdoptedPatientList(token))
    }, [])

    useEffect(() => {
        if(props.patientID !== ""){
            let patientIndex = patientsList.findIndex(element => element._id === props.patientID)
            setSelectedPatientIndex(patientIndex)
            setSelectedPatient(patientsList[patientIndex])
        }
    }, [])


    const handlePatientPicking = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPatientIndex(event.target.value as number)
        setSelectedPatient(patientsList[event.target.value as number])
    }

    const handleAddPrescription = () => {
        if (prescription !== undefined && numOfTreatments !== undefined && treatmentFreq !== undefined)
            setAddedPrescriptions(
                [...addedPrescriptions,
                {
                    prescription: medicalPrescriptions[prescription].prescription,
                    prescriptionOption,
                    numOfTreatments,
                    treatmentFreq
                }]
            )

    }

    const handleSavePrescription = () => {
        let newPatEval: PatientEvalInterface;

        if (selectedPatient !== null && clinicDiagnosis !== undefined) {
            newPatEval = {
                patient: selectedPatient._id as string,
                clinicDiagnosis: diagnosisOptions[clinicDiagnosis],
                description,
                medicalPrescription: addedPrescriptions
            }
            createNewPatEval(token, newPatEval, setSubmitStatus)

        }
    }

    return (
        <div className="pateval-view">
            <Row className="pateval-options">
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

                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => handleSavePrescription()}
                    >
                        {"Guardar"}
                    </Button>
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



            <Row className="p-0 mt-2 pateval-container">
                <Col xs={12} className="pateval-content">
                    <Row className="h-100 p-2">
                        <Col xs={12}>
                            <Row>
                                <Col xs={4}>
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

                            <Row className="mt-5">
                                <Col xs={4}>
                                    <InputLabel id="">Diagnóstico Clinico</InputLabel>
                                    <Select
                                        className={"w-100"}
                                        labelId=""
                                        id=""
                                        required
                                        value={clinicDiagnosis}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setClinicDiagnosis(event.target.value as number)
                                        }}
                                    >
                                        {diagnosisOptions.map((value, index) => (
                                            <MenuItem key={index} value={index}>
                                                {value}
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </Col>
                            </Row>
                            <Row className="mt-5">

                                <Col xs={4}>
                                    <InputLabel id="">Descrição</InputLabel>
                                    <TextField
                                        id="pateval-description"
                                        label=""
                                        multiline
                                        inputProps={{ style: { height: 150 } }}
                                        variant="outlined"
                                        value={description}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setDescription(event.target.value as string)
                                        }}
                                        className={"w-100"}
                                    />
                                </Col>
                            </Row>


                            <Row className="mt-5">
                                <Col xs={3}>
                                    <InputLabel id="">Prescrição Médica</InputLabel>
                                    <Select
                                        className={"w-100"}
                                        labelId=""
                                        id=""
                                        required
                                        value={prescription}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setPrescriptionOption([])
                                            setPrescription(event.target.value as number)
                                        }}
                                    >

                                        {medicalPrescriptions.map((value, index) => (
                                            <MenuItem key={index} value={index}>
                                                {value.prescription}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Col>
                                <Col xs={3}>
                                    {prescription !== -1 ?
                                        medicalPrescriptions[prescription].options.length > 0 ?
                                            <>
                                                <InputLabel id="">Opções</InputLabel>
                                                <Select
                                                    className={"w-100"}
                                                    labelId=""
                                                    id=""
                                                    multiple
                                                    value={prescriptionOption}
                                                    renderValue={(selected) => (selected as string[]).join(', ')}
                                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                        setPrescriptionOption(event.target.value as string[]);
                                                    }}
                                                >

                                                    {medicalPrescriptions[prescription].options.map((value, index) => {
                                                        return (
                                                            <MenuItem key={index} value={value}>
                                                                <Checkbox checked={prescriptionOption.indexOf(value) > -1} />
                                                                {value}
                                                            </MenuItem>
                                                        )
                                                    }
                                                    )
                                                    }

                                                </Select>
                                            </>
                                            :
                                            <></>
                                        :
                                        <></>
                                    }
                                </Col>
                                <Col xs={2}>
                                    <InputLabel id="">Número de Tratamentos</InputLabel>
                                    <TextField
                                        id=""
                                        label=""
                                        variant="outlined"
                                        type="number"
                                        value={numOfTreatments}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setNumOfTreatments(event.target.value as number)
                                        }}
                                        className={"w-100"}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <InputLabel id="">Frequência do Tratamento</InputLabel>
                                    <TextField
                                        id=""
                                        label=""
                                        variant="outlined"
                                        value={treatmentFreq}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            setTreatmentFreq(event.target.value as string)
                                        }}
                                        className={"w-100"}
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button
                                        className="w-100 h-100"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={() => handleAddPrescription()}
                                    >
                                        {"Adicionar"}
                                    </Button>
                                </Col>
                            </Row>

                            {
                                addedPrescriptions.map((value: any, index) => {
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
        </div>
    );
}

export default NewPatEval;
