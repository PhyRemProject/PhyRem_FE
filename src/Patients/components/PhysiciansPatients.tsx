import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import "../styles/patients.css"
import {
    TextField,
    Button
} from '@material-ui/core';

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";


import PatientCard from "./PatientCard"
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../PatientReducer';
import { GetAdoptedPatientList } from '../PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PhysiciansPatientsProps {
    setDisplayedView: Function
}

function PhysiciansPatients(props: PhysiciansPatientsProps) {


    const [filterTerm, setFilterTerm] = useState<string | null>(null);
    const [filterResult, setFilterResult] = useState<PatientInterface[] | null>(null);

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const patientList = useSelector((state: PatientReducer) => state.PatientReducer.physiciansPatients)
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAdoptedPatientList(token))
    }, [])


    const updateFilterResults = (term: string) => {

        setFilterTerm(term)

        //If no term is specified, set the result as null
        if (term.length === 0) {
            setFilterResult(null)
            return
        } else {

            let filteredPatients = patientList.filter((patient) => {
                return patient.name?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
            })

            if (filteredPatients === undefined)
                setFilterResult(null)
            else
                setFilterResult(filteredPatients as PatientInterface[])
        }
    }

    return (
        <div className="patient-view">
            <Row className="patient-list-options">
                <Col sm={3} className={"p-0 pt-2"}>
                    <TextField
                        id="outlined-basic"
                        label="Filtrar"
                        variant="outlined"
                        value={filterTerm}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            updateFilterResults(event.target.value as string)
                        }}
                        className={"w-100 mt-0"}
                    />
                </Col>
                <Col sm={7}>

                </Col>
                <Col sm={2}>

                    <Link to={"/dashboard/patients/all"}>
                        <Button
                            className="form-elems w-100 h-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => {  }}
                        >
                            <FontAwesomeIcon icon={faSearch} id="search-logo" />
                            {" Novo Paciente"}
                        </Button>
                    </Link>
                </Col>
            </Row>

            

            <Row className="p-0 mt-2">
                <Col xs={12}>
                    <Row id="patient-list-header">
                        <Col xs={2}>

                        </Col>
                        <Col xs={3}>
                            <b>Nome</b>
                        </Col>
                        <Col xs={2}>
                            <b>Contacto</b>
                        </Col>
                        <Col xs={2}>
                            <b>Morada</b>
                        </Col>
                        <Col xs={2}>
                            <b>Sexo</b>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row className="patient-list-content">

                        {/* If the PatientList is null, an error occured during fetch */}
                        {patientList === null ?
                            <p>Falha a carregar pacientes</p>
                            : isFetching === true ?
                                <p>A Carregar ...</p>
                                : patientList.length === 0 ?
                                    <p>Não tem pacientes atribuidos</p>
                                    // If filterResult is null, a filter is not being applied, therefore, show the patient list
                                    : filterResult === null ?
                                        patientList.map((patient: PatientInterface, index: number) => {

                                            return <PatientCard data={
                                                {
                                                    id: patient._id as string,
                                                    name: patient.name as string,
                                                    email: patient.email as string,
                                                    contact: patient.phoneNumber as string,
                                                    address: patient.address as string,
                                                    gender: patient.gender as string
                                                }
                                            }
                                                key={index}
                                            />
                                        })
                                        :
                                        //If there are no results with filter, show warning
                                        filterResult.length === 0 ?
                                            <p>Nenhum paciente de nome "{filterTerm}"</p>
                                            :
                                            filterResult.map((patient: PatientInterface, index: number) => {

                                                return <PatientCard data={
                                                    {
                                                        id: patient._id as string,
                                                        name: patient.name as string,
                                                        email: patient.email as string,
                                                        contact: patient.phoneNumber as string,
                                                        address: patient.address as string,
                                                        gender: patient.gender as string
                                                    }
                                                }
                                                    key={index}
                                                />
                                            })
                        }

                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default PhysiciansPatients;
