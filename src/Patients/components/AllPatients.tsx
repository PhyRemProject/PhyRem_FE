import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
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
import { GetAdoptedPatientList, GetPatientsWithName } from '../PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AllPatients() {


    const [filterTerm, setFilterTerm] = useState<string>("");

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const patientList = useSelector((state: PatientReducer) => state.PatientReducer.loadedPatients)
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching)

    const dispatch = useDispatch();

    const updateSearchResults = () => {

        dispatch(GetPatientsWithName(token, filterTerm))

    }

    return (
        <div className="patient-view">
            <Row className="patient-list-options">
                <Col sm={5} className={"p-0 pt-2"}>
                    <h4>Procurar Novo Paciente</h4>
                    <br />
                </Col>
                <Col sm={6}>
                    <TextField
                        id="outlined-basic"
                        label="Nome do paciente"
                        variant="outlined"
                        value={filterTerm}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            setFilterTerm(event.target.value as string)
                        }}
                        className={"w-100 mt-0"}
                    />
                </Col>
                <Col sm={1}>
                    <Button
                        className="form-elems h-100 w-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={updateSearchResults}
                    >
                        <FontAwesomeIcon icon={faSearch} id="search-logo" />
                        {" Pesquisar"}
                    </Button>

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
                                : filterTerm === "" ?
                                    <p>Inicie uma pesquisa</p>
                                : patientList.length === 0 ?
                                    <p>Não foram encontrados resultados com nome "{filterTerm}"</p>
                                    :
                                    // If filterResult is null, a filter is not being applied, therefore, show the patient list
                                    patientList.map((patient: PatientInterface, index: number) => {

                                        return <PatientCard data={
                                            {
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

export default AllPatients;
