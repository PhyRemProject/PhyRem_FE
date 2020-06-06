import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Container,
    Row,
    Col
} from "react-bootstrap";

import Button from "@material-ui/core/Button";


import "../styles/header.css"

function Header() {

    return (
        <div className="header">
            <div id="greetings">
                <span id="greetings-day">Bom Dia,</span> Dra. Diana
            </div>
            <div id="logout">
                <Button
                    id="logout-button"
                    className="form-elems"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                   X Sair
                </Button>
            </div>
        </div>
    );

}

export default Header;
