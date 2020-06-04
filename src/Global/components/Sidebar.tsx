import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import "../styles/sidebar.css"
import logo from "../../Home/images/logo.png"

import {
    IconDefinition,
    faWindowRestore,
    faCalendarAlt,
    faUser,
    faCog
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OptionProps {
    name: string,
    selected: boolean | null,
    logo: IconDefinition
}

function Option(props: OptionProps) {
    return (
        <div className="option" id={props.selected ? "option-selected" : "option-not-selected"}>
            <FontAwesomeIcon icon={props.logo} className="option-logo" />
            {props.name}
        </div>
    )
}

function Sidebar() {


    return (
        <div className="sidebar">
            <div id="logo">
                <img id="logo" src={logo} />
            </div>
            <Option name="Visão Geral" logo={faWindowRestore} selected />
            <Option name="Consultas" logo={faCalendarAlt} selected={false} />
            <Option name="Pacientes" logo={faUser} selected={false} />
            <Option name="Definições" logo={faCog} selected={false} />

        </div>
    );


}

export default Sidebar;
