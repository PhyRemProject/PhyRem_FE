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
    Button
} from '@material-ui/core';

import {
    faSearch, faPlusCircle
} from "@fortawesome/free-solid-svg-icons";


import PatientCard from "./PatEvalCard"
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../../Patients/PatientReducer';
import { GetAdoptedPatientList } from '../../Patients/PatientActions';
import { PatientInterface } from '../../User/components/Patients';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PatientEvalInterface, getPhysicianPatEvals } from '../PatientEvalsActions';
import PatEvalCard from './PatEvalCard';



function AllPatEvals() {


    const [filterTerm, setFilterTerm] = useState<string | null>(null);
    const [filterResult, setFilterResult] = useState<PatientEvalInterface[] | null>(null);

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [patEvalList, setPatEvalList] = useState<PatientEvalInterface[]>()
    const [fetchStatus, setFetchStatus] = useState<string>()

    const dispatch = useDispatch();

    useEffect(() => {
        getPhysicianPatEvals(token, setFetchStatus, setPatEvalList)
    }, [])


    const updateFilterResults = (term: string) => {

        setFilterTerm(term)

        //If no term is specified, set the result as null
        if (term.length === 0) {
            setFilterResult(null)
            return
        } else {

            if (fetchStatus === "complete" && patEvalList !== undefined) {
                let filteredPatEvals = patEvalList.filter((patEval) => {
                    return patEval.patientName?.toLocaleLowerCase().includes(term.toLocaleLowerCase())
                })

                if (filteredPatEvals === undefined)
                    setFilterResult(null)
                else
                    setFilterResult(filteredPatEvals as PatientEvalInterface[])
            }
        }
    }

    console.log(patEvalList)

    return (
        <div className="pateval-view">
            <Row className="pateval-options">
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

                    <Link to={"/dashboard/pateval/new"}>
                        <Button
                            className="form-elems w-100 h-100"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => { }}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} id="search-logo" className="mr-2"/>
                            {"Nova Avaliação"}
                        </Button>
                    </Link>
                </Col>
            </Row>



            <Row className="p-0 mt-2">
                <Col xs={12}>
                    <Row id="pateval-header">
                        <Col xs={2}>

                        </Col>
                        <Col xs={3}>
                            <b>Paciente</b>
                        </Col>
                        <Col xs={2}>
                            <b>Data</b>
                        </Col>
                        <Col xs={2}>
                            <b>Diagnóstico</b>
                        </Col>
                        <Col xs={2}>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row className="patient-list-content">

                        {/* If the PatientList is null, an error occured during fetch */}
                        {patEvalList === undefined || patEvalList === undefined ?
                            <p>Falha a carregar as avaliações de paciente</p>
                            : fetchStatus === "loading" ?
                                <p>A Carregar ...</p>
                                : patEvalList.length === 0 ?
                                    <p>Não existem avaliações de paciente registadas</p>
                                    // If filterResult is null, a filter is not being applied, therefore, show the patient list
                                    : filterResult === null ?
                                        patEvalList.map((patEval: PatientEvalInterface, index: number) => {
                                            return <PatEvalCard data={patEval} key={index}/>
                                        })
                                        :
                                        //If there are no results with filter, show warning
                                        filterResult.length === 0 ?
                                            <p>Nenhuma avaliação com paciente de nome: "{filterTerm}"</p>
                                            :
                                            filterResult.map((patEval: PatientEvalInterface, index: number) => {

                                                return <PatEvalCard data={patEval} key={index}/>
                                            })
                        }

                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AllPatEvals;
