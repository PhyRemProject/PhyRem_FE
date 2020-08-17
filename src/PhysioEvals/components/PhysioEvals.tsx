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
import NewPhysioEval from './NewPhysioEval';


function PatEvals() {

    let location = useLocation();
    const [currentView, setCurrentView] = useState<string>("");
    const [currentViewArg, setCurrentViewArg] = useState<string>("");

    //Updates the currentView, can be:
    //  All: displays all the patevals of the physiatrist
    //  New: displays the form of a new pateval, for auto-complete, provide patientID as next argument
    //  "patevalID": displays the pateval
    const activePatEvalView = () => {
        let path = location.pathname.split("/")
        console.log("path: ", path)
        if (path.length === 3)
            setCurrentView("all")
        else if (path.length >= 4) {
            if (path[3] === "all")
                setCurrentView("all")
            else if (path[3] === "new") {
                setCurrentView("new")
                setCurrentViewArg(path[4])
            }
            else {
                setCurrentView("eval")
                setCurrentViewArg(path[3])
            }
        }
    }

    useEffect(() => activePatEvalView(), [location]);


    return (
        <>
            {currentView === "all" ?
                //<AllPatEvals />
                <p>All pat evals</p>
                : currentView === "new" ?
                    <NewPhysioEval patientID={currentViewArg} />
                    : currentView === "eval" ?
                        <p>Physio evals</p>
                        //<PatEvalInfo patEvalID={currentViewArg} />
                        :
                        <>URL incorrecto</>
            }
        </>
    );
}

export default PatEvals;
