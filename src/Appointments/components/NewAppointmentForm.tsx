import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';

import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import AppointmentReducer, { AppointmentInterface } from "../AppointmentReducer"

import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css"
import "../styles/appointments.css"
import { getAppointsBetween, acceptAppoint, rejectAppoint, createAppoint } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';
import { FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import { GetAdoptedPatientList } from '../../Patients/PatientActions';
import PatientReducer from '../../Patients/PatientReducer';
import ReactDatePicker from 'react-datepicker';


interface AppointmentDetailsProps {
    selectedAppoint: number | undefined,
    loadedAppoints: AppointmentInterface[]
}



function NewAppointmentForm() {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching) as boolean
    const patientsList = useSelector((state: PatientReducer) => state.PatientReducer.physiciansPatients) as PatientInterface[]
    const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(-1);
    const [selectedPatient, setSelectedPatient] = useState<PatientInterface | null>(null);
    const [startDate, setStartDate] = useState<Date>(new Date);
    const [endDate, setEndDate] = useState<Date>(new Date);
    const [location, setLocation] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [objective, setObjective] = useState<string>("");
    const [selectedPatEval, setSelectedPatEval] = useState<string>("");
    const [status, setStatus] = useState<string | null>(null);

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(GetAdoptedPatientList(token))
    }, [])


    const handleCreateAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(
            createAppoint(
                setStatus,
                startDate,
                endDate,
                location,
                selectedPatient as PatientInterface,
                objective,
                summary,
                token
            ))
    }

    const handlePatientPicking = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedPatientIndex(event.target.value as number)
        setSelectedPatient(patientsList[event.target.value as number])
        setStatus(null)
    }

    return (
        <>
            <h5 id="details-title">Nova Consulta</h5>
            <div id="new-appoint" >
                {isFetching ? <p>Loading...</p> : <></>}
                {
                    patientsList.length === 0 ?
                        <p>Não tem pacientes adoptados</p>
                        :
                        <form className={"w-100 mt-2"}>
                            <InputLabel id="patient-label">Paciente</InputLabel>
                            <Select
                                className={"w-100"}
                                labelId="patient-label"
                                id="patient-label-select"
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

                            <InputLabel id="date-label" className={"mt-4"}>Data da Consulta</InputLabel>
                            <span>Inicio</span>
                            <ReactDatePicker
                                className={"w-100"}
                                selected={startDate}
                                onChange={(date: Date | null) => {
                                    setStartDate(date || new Date)
                                }}
                                showTimeSelect
                                // excludeTimes={[
                                //     setHours(setMinutes(new Date(), 0), 17),
                                //     setHours(setMinutes(new Date(), 30), 18),
                                //     setHours(setMinutes(new Date(), 30), 19),
                                //     setHours(setMinutes(new Date(), 30), 17)
                                // ]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />
                            <br />

                            <span>Fim</span>
                            <ReactDatePicker
                                className={"w-100"}
                                selected={endDate}
                                onChange={(date: Date | null) => {
                                    setEndDate(date || new Date)
                                }}
                                showTimeSelect
                                // excludeTimes={[
                                //     setHours(setMinutes(new Date(), 0), 17),
                                //     setHours(setMinutes(new Date(), 30), 18),
                                //     setHours(setMinutes(new Date(), 30), 19),
                                //     setHours(setMinutes(new Date(), 30), 17)
                                // ]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                            />


                            <TextField
                                id="outlined-basic"
                                label="Localização"
                                variant="outlined"
                                value={location}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setLocation(event.target.value as string)
                                }}
                                className={"w-100 mt-3"}
                            />

                            <InputLabel
                                id="objective-label"
                                className={"mt-4 w-100"}
                            >Objectivo</InputLabel>
                            <Select
                                className={"w-100"}
                                labelId="objective-label"
                                id="objective-label-select"
                                required
                                defaultValue={"appointment"}
                                value={objective}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setObjective(event.target.value as string)
                                }}
                            >
                                <MenuItem value={"appointment"}>Consulta</MenuItem>
                                <MenuItem value={"treatment"}>Tratamento</MenuItem>
                                <MenuItem value={"evaluation"}>Avaliação</MenuItem>

                            </Select>


                            <TextField
                                id="outlined-basic "
                                label="Resumo"
                                variant="outlined"
                                multiline
                                required
                                value={summary}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setSummary(event.target.value as string)
                                }}
                                className={"w-100 mt-3 "}
                                inputProps={{ style: { height: 230 } }}
                            />

                            <InputLabel
                                id="patienteval-label"
                                className={"mt-4 w-100"}
                            >Avaliação de Paciente</InputLabel>
                            <Select
                                className={"w-100"}
                                labelId="patienteval-label"
                                id="patienteval-label-select"
                                defaultValue={""}
                                
                            >
                                <MenuItem value={""}>Nenhuma</MenuItem>

                            </Select>

                            {status !== null ? 
                            <Alert variant="filled" severity="error">
                                {status}
                            </Alert>
                            :<></>}

                            <Button
                                className="form-elems w-100 pt-3 pb-3 mb-3 mt-3"
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={handleCreateAppointment}
                            >
                                Registar Consulta
                        </Button>

                        </form>
                }
            </div>
        </>

    )
}

export default NewAppointmentForm;