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

import PatientCard from "./PatientCard"

function Patients() {

    const [search, setSearch] = useState<string | null>(null);


    return (
        <div className="patient-view">
            <Row className="patient-list-options">
                <Col sm={3} className={"p-0 pt-2"}>
                    <TextField
                        id="outlined-basic"
                        label="Filtrar"
                        variant="outlined"
                        value={search}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            setSearch(event.target.value as string)
                        }}
                        className={"w-100 mt-0"}
                    />
                </Col>
                <Col sm={7}>

                </Col>
                <Col sm={2}>
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => { }}
                    >
                        Atribuir Paciente
                </Button>
                </Col>
            </Row>

            <Row className="p-0 mt-2">
                <Col xs={12}>
                    <Row id="patient-list-header">
                        <Col xs={3}>
                            img
                    </Col>
                        <Col xs={3}>
                            name
                    </Col>
                        <Col xs={3}>
                            age
                    </Col>
                        <Col xs={3}>
                            whatever
                    </Col>
                    </Row>
                    <Row className="patient-list-content">

                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>
                        <PatientCard></PatientCard>


                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Patients;
