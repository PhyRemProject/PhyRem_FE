import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, useLocation } from "react-router-dom";
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
import PhysiciansPatients from './PhysiciansPatients';
import AllPatients from './AllPatients';


function Patients() {

    let location = useLocation();
    const [currentView, setCurrentView] = useState<string>("");

    //Updates the currentView, can be:
    //  None: displays the physician's
    //  All: displays all the patients on the system
    //  patientID: displays the patient information view  
    const activePatientView = () => {
        let path = location.pathname.split("/")
        console.log(path)
        if (path.length === 3)
            setCurrentView("")
        else if (path.length === 4) {
            if (path[3] === "all")
                setCurrentView("all")
        }
    }

    useEffect(() => activePatientView(), [location]);


    return (
        <>
            {currentView === "" ?
                <PhysiciansPatients setDisplayedView={setCurrentView} /> :
                currentView === "all" ?
                    <AllPatients/>
                    :
                    <>hnn</>
            }
        </>
    );
}

export default Patients;
