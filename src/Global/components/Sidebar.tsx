import React from 'react';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
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
import UserReducer from '../../User/UserReducer';

interface OptionProps {
    name: string,
    selected: boolean | null,
    logo: IconDefinition,
    route: string
}

function Option(props: OptionProps) {

    return (
        <Link to={"/dashboard/" + props.route}>
            <div className="option" id={props.selected ? "option-selected" : "option-not-selected"}>
                <FontAwesomeIcon icon={props.logo} className="option-logo" />
                {props.name}
            </div>
        </Link>
    )
}

function Sidebar() {

    const user = useSelector((state: UserReducer) => state.UserReducer.user)


    return (
        <div className="sidebar">
            <div className="logo">
                <img className="logo" src={logo} />
            </div>
            <Option name="Visão Geral" logo={faWindowRestore} route={""} selected />
            <Option name="Consultas" logo={faCalendarAlt} route={"appointments"} selected={false} />
            <Option name="Pacientes" logo={faUser} route={""} selected={false} />
            <Option name="Definições" logo={faCog} route={""} selected={false} />
            <div className="user-card">
                <div className="username">
                    <span id="username">
                        {user?.gender?.toLowerCase() === "male" ? "Dr. " : "Dra. "}
                        {user?.name}
                    </span>
                    <span id="specialty">
                        {user?.specialty?.map((specialty) => { return (specialty) + " " })}
                    </span>
                </div>
                <img id="user-image" src={`${process.env.PUBLIC_URL}/images/` + user?.imageUrl as string} />
            </div>
        </div>
    );


}

export default Sidebar;
