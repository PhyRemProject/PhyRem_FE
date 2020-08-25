import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import {
    TextField,
    Button
} from '@material-ui/core';

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import NewPhysician from './NewPhysician';
import NewPatient from './NewPatient';
import AllPatientsList from './AllPatientsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PatientInterface } from '../../User/components/Patients';
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../../Patients/PatientReducer';
import { getPatientsWithName, getPhysiciansWithName, PhysicianInterface } from '../OfficeActions';
import AllPhysicianList from './AllPhysicianList';

function Office() {

    let location = useLocation();
    const [activeView, setActiveView] = useState<string>("patient-list");

    const [filterTerm, setFilterTerm] = useState<string>("");
    const [prevFilterTerm, setPrevFilterTerm] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Object[]>([]);
    const [fetchStatus, setFetchStatus] = useState("idle")

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const updateSearchResults = () => {
        setPrevFilterTerm(filterTerm)
        if (activeView === "patient-list")
            getPatientsWithName(token, filterTerm, setFetchStatus)
                .then((value) => {
                    setSearchResult(value as PatientInterface[])
                })
        else if (activeView === "physician-list")
            getPhysiciansWithName(token, filterTerm, setFetchStatus)
                .then((value) => {
                    setSearchResult(value as PhysicianInterface[])
                })
    }

    return (
        <>
            <Row className="h-100">
                <Col sm={12} className={"h-100"}>
                    <Row className={"h-100 w-100"}>
                        <Col sm={4} className={"h-100"}>
                            <Row className="pb-5" style={{ height: "47%" }}>
                                <Col sm={12} className={"h-100"}>
                                    <Row>
                                        <Col xs={12}>
                                            <h4><b>Utentes</b></h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={12}>
                                            <h5 className="mb-3">Informações</h5>
                                            <span>Número de Utentes: </span>
                                            <br />
                                            <span>Consultas Registadas: </span>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col xs={12}>
                                            <h5>Acções</h5>
                                            {activeView !== "patient-list" ?
                                                <Button
                                                    className=""
                                                    variant="contained"
                                                    color="secondary"
                                                    type="submit"
                                                    onClick={() => { setActiveView("patient-list") }}
                                                >
                                                    {"Ver Todos os Utentes"}
                                                </Button>
                                                :
                                                <Button
                                                    className=""
                                                    disabled
                                                    variant="contained"
                                                    color="inherit"
                                                    type="submit"
                                                    onClick={() => { setActiveView("patient-list") }}
                                                >
                                                    {"Ver Todos os Utentes"}
                                                </Button>
                                            }
                                            {activeView !== "patient-form" ?
                                                <Button
                                                    className="ml-3"
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => { setActiveView("patient-form") }}
                                                >
                                                    {"Criar Utente"}
                                                </Button>
                                                : <Button
                                                    disabled
                                                    className="ml-3"
                                                    variant="contained"
                                                    color="inherit"
                                                    type="submit"
                                                    onClick={() => { setActiveView("patient-form") }}
                                                >
                                                    {"Criar Utente"}
                                                </Button>
                                            }


                                        </Col>
                                    </Row>
                                    {activeView === "patient-list" ?
                                        <Row className={"mt-5"}>
                                            <Col xs={12}>
                                                <h5>Pesquisar</h5>
                                                <Row>
                                                    <Col sm={12}>
                                                        <TextField
                                                            className={"form-elems w-100 h-100"}
                                                            id="outlined-basic"
                                                            label="Nome do Utente"
                                                            variant="outlined"
                                                            value={filterTerm}
                                                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                                setFilterTerm(event.target.value as string)
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className={"mt-2"}>
                                                    <Col sm={6}>
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
                                                    <Col sm={6}>
                                                        <Button
                                                            className="form-elems h-100 w-100"
                                                            variant="contained"
                                                            color="secondary"
                                                            type="submit"
                                                            onClick={() => {
                                                                setFilterTerm("")
                                                                setPrevFilterTerm("")
                                                                setSearchResult([])
                                                            }}
                                                        >
                                                            {" Limpar"}
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                        : <></>
                                    }
                                </Col>
                            </Row>
                            <Row className="pb-5" style={{ height: "47%" }}>
                                <Col sm={12} className={"h-100"}>
                                    <Row>
                                        <Col xs={12}>
                                            <h4><b>Médicos</b></h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col xs={12}>
                                            <h5 className="mb-3">Informações</h5>
                                            <span>Número de Médicos: </span>
                                            <br />
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col xs={12}>
                                            <h5>Acções</h5>
                                            {activeView !== "physician-list" ?
                                                <Button
                                                    className=""
                                                    variant="contained"
                                                    color="secondary"
                                                    type="submit"
                                                    onClick={() => { setActiveView("physician-list") }}
                                                >
                                                    {"Ver Todos os Médicos"}
                                                </Button>
                                                :
                                                <Button
                                                    className=""
                                                    disabled
                                                    variant="contained"
                                                    color="inherit"
                                                    type="submit"
                                                    onClick={() => { setActiveView("physician-list") }}
                                                >
                                                    {"Ver Todos os Médicos"}
                                                </Button>
                                            }
                                            {activeView !== "physician-form" ?
                                                <Button
                                                    className="ml-3"
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => { setActiveView("physician-form") }}
                                                >
                                                    {"Criar Médico"}
                                                </Button>
                                                : <Button
                                                    disabled
                                                    className="ml-3"
                                                    variant="contained"
                                                    color="inherit"
                                                    type="submit"
                                                    onClick={() => { setActiveView("physician-form") }}
                                                >
                                                    {"Criar Médico"}
                                                </Button>
                                            }


                                        </Col>
                                    </Row>
                                    {activeView === "physician-list" ?
                                        <Row className={"mt-5"}>
                                            <Col xs={12}>
                                                <h5>Pesquisar</h5>
                                                <Row>
                                                    <Col sm={12}>
                                                        <TextField
                                                            className={"form-elems w-100 h-100"}
                                                            id="outlined-basic"
                                                            label="Nome do Médico"
                                                            variant="outlined"
                                                            value={filterTerm}
                                                            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                                                setFilterTerm(event.target.value as string)
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className={"mt-2"}>
                                                    <Col sm={6}>
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
                                                    <Col sm={6}>
                                                        <Button
                                                            className="form-elems h-100 w-100"
                                                            variant="contained"
                                                            color="secondary"
                                                            type="submit"
                                                            onClick={() => {
                                                                setFilterTerm("")
                                                                setPrevFilterTerm("")
                                                                setSearchResult([])
                                                            }}
                                                        >
                                                            {" Limpar"}
                                                        </Button>
                                                    </Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                        : <></>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={8} style={{ height: "95%" }}>
                            {
                                activeView === "patient-list" ?
                                    <AllPatientsList searchResult={searchResult as PatientInterface[]} filterTerm={filterTerm} prevFilterTerm={prevFilterTerm} />
                                    : activeView === "patient-form" ?
                                        <NewPatient />
                                        : activeView === "physician-list" ?
                                            <AllPhysicianList searchResult={searchResult as PhysicianInterface[]} filterTerm={filterTerm} prevFilterTerm={prevFilterTerm} />
                                            : activeView === "physician-form" ?
                                                <NewPhysician />
                                                :
                                                <></>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Office;
