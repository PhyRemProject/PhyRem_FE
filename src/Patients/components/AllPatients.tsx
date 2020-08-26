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
import { GetAdoptedPatientList, GetPatientsWithName } from '../PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllPatientsList from '../../Office/components/AllPatientsList';

function AllPatients() {


    const [filterTerm, setFilterTerm] = useState<string>("");
    const [prevFilterTerm, setPrevFilterTerm] = useState<string>("");
    const [searchResult, setSearchResult] = useState<PatientInterface[]>([]);

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const patientList = useSelector((state: PatientReducer) => state.PatientReducer.loadedPatients)
    const isFetching = useSelector((state: PatientReducer) => state.PatientReducer.isFetching)

    const dispatch = useDispatch();

    const updateSearchResults = () => {
        setPrevFilterTerm(filterTerm)
        dispatch(GetPatientsWithName(token, filterTerm))
    }

    useMemo(() => { setSearchResult(patientList) }, [patientList]);

    return (
        <div className="patient-view">
            <Row className="patient-list-options">
                <Col sm={12} className={"p-0 pt-2"}>
                    <h4>Procurar Novo Paciente</h4>
                    <br />
                </Col>
            </Row>

            <Row className="patient-list-options">
                <Col sm={10}>
                    <TextField
                        className={"form-elems w-100 h-100"}
                        id="outlined-basic"
                        label="Nome do paciente"
                        variant="outlined"
                        value={filterTerm}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            setFilterTerm(event.target.value as string)
                        }}
                    />
                </Col>
                <Col sm={1}>
                    <Button
                        className="form-elems h-100 w-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={updateSearchResults}
                    >
                        <FontAwesomeIcon icon={faSearch} id="search-logo" />
                        {" Pesquisar"}
                    </Button>
                </Col>
                <Col sm={1}>
                    <Link to={"/dashboard/patients"}>

                        <Button
                            className="form-elems h-100 w-100"
                            variant="contained"
                            color="secondary"
                            type="submit"
                            onClick={() => { }}
                        >
                            {" Cancelar"}
                        </Button>
                    </Link>
                </Col>

            </Row>


            <Row className="p-0 mt-2 all-patient-list-content">
                <Col xs={12} className="h-100">
                    <AllPatientsList searchResult={searchResult as PatientInterface[]} filterTerm={filterTerm} prevFilterTerm={prevFilterTerm} />
                </Col>


                {/* If the PatientList is null, an error occured during fetch
                            {patientList === null ?
                                <p>Falha a carregar pacientes</p>
                                : isFetching === true ?
                                    <p>A Carregar ...</p>
                                    : searchResult.length === 0 && filterTerm === "" ?
                                        <p>Inicie uma pesquisa</p>
                                        : searchResult.length === 0 ?
                                            <p>Não foram encontrados resultados com nome "{prevFilterTerm}"</p>
                                            :
                                            // If filterResult is null, a filter is not being applied, therefore, show the patient list
                                            searchResult.map((patient: PatientInterface, index: number) => {

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
                            } */}

            </Row>
        </div>
    );
}

export default AllPatients;
