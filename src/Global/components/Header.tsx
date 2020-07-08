import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import Button from "@material-ui/core/Button";
import {
    IconDefinition,
    faCloudSun
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/header.css"
import { AttemptLogout } from '../../User/UserActions';

function Header() {


    const handleLogout = () => {
        AttemptLogout()
    }

    return (
        <div className="header">
            <div id="greetings">
                <FontAwesomeIcon icon={faCloudSun} id="weather-logo"/>
                <span id="greetings-day">Bom Dia,</span> Dra. Diana
            </div>
            <div id="logout">
                <Button
                    id="red-button"
                    className="form-elems"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleLogout}
                >
                    X Sair
                </Button>
            </div>
        </div>
    );

}

export default Header;
