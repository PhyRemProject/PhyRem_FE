import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image,

} from "react-bootstrap";

import Button from "@material-ui/core/Button";

import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import AppointmentReducer, { AppointmentInterface } from "../AppointmentReducer"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "../styles/appointments.css"
import { getAppointsBetween, acceptAppoint, rejectAppoint } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';
import { FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import { GetAdoptedPatientList } from '../../Patients/PatientActions';
import PatientReducer from '../../Patients/PatientReducer';


interface AppointmentDetailsProps {
    selectedAppoint: number | undefined,
    loadedAppoints: AppointmentInterface[]
}



function NewAppointmentForm() {

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching) as boolean
    const patientsList = useSelector((state: PatientReducer) => state.PatientReducer.physiciansPatients) as PatientInterface[]
    const [selectedPatient, setSelectedPatient] = useState<string>();


    const dispatch = useDispatch()


    useEffect(() => {
        getPhysiciansPatientList()
    }, [])


    const handleCreateAppointment = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(e)
        console.log("Submiting")
    }

    const getPhysiciansPatientList = () => {
        dispatch(GetAdoptedPatientList(token))
    }

    const handlePatientPicking = (event : any) => {
        setSelectedPatient(event.target.value)
    }

    return (
        <>
            <h5 id="details-title">Nova Consulta</h5>
            <div id="new-appoint" >
                {isFetching ? <p>Loading...</p> : <></>}
                {
                    patientsList === null ?
                        <p>Loading...</p> :
                        patientsList.length === 0 ?
                            <p>Não tem pacientes adoptados</p>
                            :
                            <form>
                                <FormControl className={"w-100 mt-2"}>
                                    <InputLabel id="patient-label">Paciente</InputLabel>
                                    <Select
                                        labelId="patient-label"
                                        id="patient-label-select"
                                    >
                                        {
                                            patientsList.map((patient: PatientInterface, index: number) => {
                                                return <MenuItem
                                                    value={patient._id || ""}
                                                    key={index}
                                                    onChange={handlePatientPicking}
                                                >
                                                    {patient.name} - {patient.email}
                                                </MenuItem>
                                            })
                                        }

                                    </Select>
                                </FormControl>
                                <TextField
                                    id="datetime-local"
                                    label="Data da Consulta"
                                    type="datetime-local"
                                    defaultValue={""}
                                    className={"w-100 mt-2"}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField id="outlined-basic" label="Localização" variant="outlined" className="w-100 mt-3" />
                                <TextField id="outlined-basic" label="Resumo" variant="outlined" className="w-100 mt-3" />

                                <FormControl className={"w-100 mt-3"}>
                                    <InputLabel id="patienteval-label">Avaliação de Paciente</InputLabel>
                                    <Select
                                        labelId="patienteval-label"
                                        id="patienteval-label-select"
                                        defaultValue={0}
                                    >
                                        <MenuItem value={0}>Nenhuma</MenuItem>

                                    </Select>
                                </FormControl>

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