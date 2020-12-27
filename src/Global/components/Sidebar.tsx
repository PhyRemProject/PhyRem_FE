import React, { useMemo, useEffect, useState } from 'react';
import { Switch, Route, Link, useRouteMatch, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

import "../styles/sidebar.css"
import logo from "../../Home/images/logo.png"

import {
    IconDefinition,
    faWindowRestore,
    faCalendarAlt,
    faUser,
    faCog,
    faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserReducer from '../../User/UserReducer';

interface OptionProps {
    name: string,
    logo: IconDefinition,
    route: string,
    activeView: string
}

function Option(props: OptionProps) {

    return (
        <Link to={"/dashboard/" + props.route}>
            <div className="option" id={props.route === props.activeView ? "option-selected" : "option-not-selected"}>
                <FontAwesomeIcon icon={props.logo} className="option-logo" />
                {props.name}
            </div>
        </Link>
    )
}

function Sidebar() {

    const user = useSelector((state: UserReducer) => state.UserReducer.user);
    const [activeView, setActiveView] = useState<string>("");
    let location = useLocation();

    const setOptionHighlight = () => {
        let path = location.pathname.split("/")
        setActiveView(path[2])
    }

    useEffect(() => setOptionHighlight(), [location]);


    return (
        <div className="sidebar">
            <div className="logo">
                <img className="logo" src={logo} />
            </div>
            <Option name="Visão Geral" logo={faWindowRestore} route={""} activeView={activeView} />
            <Option name="Consultas" logo={faCalendarAlt} route={"appointments"} activeView={activeView} />
            <Option name="Pacientes" logo={faUser} route={"patients"} activeView={activeView} />
            <Option name="Avaliação de Paciente" logo={faPaperclip} route={"pateval"} activeView={activeView} />
            <Option name="Secretaria" logo={faCog} route={"office"} activeView={activeView} />
            {/* <Option name="Definições" logo={faCog} route={"settings"} activeView={activeView} /> */}

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
                <img id="user-image" src={`${process.env.REACT_APP_PUBLIC_URL}/api/physician/profileImage/` + user?._id as string} onError={(e) => { e.currentTarget.src = `${process.env.REACT_APP_PUBLIC_URL}/images/default_user_icon.png` }}/>
            </div>
        </div>
    );


}

export default Sidebar;
