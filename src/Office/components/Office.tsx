import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
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

function Office() {

    let location = useLocation();
    const [currentView, setCurrentView] = useState<string>("");
    const [currentViewArg, setCurrentViewArg] = useState<string>("");


    return (
        <>
            <Row className="">
                <Col sm={2}>
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { setCurrentView("physician") }}
                    >
                        {"Novo Médico"}
                    </Button>
                </Col>
                <Col sm={2}>
                    <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { setCurrentView("patient")}}
                    >
                        {"Novo Paciente"}
                    </Button>
                </Col>
            </Row>
            <Row className="">
                {
                    currentView === "physician" ?
                        <NewPhysician />
                        :
                        currentView === "patient" ?
                            <NewPatient />
                            :
                            <></>
                }
            </Row>
        </>
    );
}

export default Office;
