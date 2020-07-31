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
import UserReducer from '../../User/UserReducer';

import moment from "moment"
import 'moment/locale/pt';

function Header() {

    const user = useSelector((state: UserReducer) => state.UserReducer.user);

    const handleLogout = () => {
        AttemptLogout()
    }


    /** Today's date**/
    var ptMoment = moment();
    ptMoment.locale('pt');

    // Code from: https://gist.github.com/James1x0/8443042
    function getGreetingTime(m: any) {
        var g = null; //return g

        if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 20 //24hr time to split the evening
        var split_night = 6 //24hr time to split the night
        var currentHour = parseFloat(m.format("HH"));

        if (split_afternoon <= currentHour && currentHour <= split_evening) {
            g = "Tarde";
        } else if (split_evening <= currentHour && currentHour >= split_night || currentHour <= split_night) {
            g = "Noite";
        } else {
            g = "Dia";
        }

        return g;
    }

    return (
        <div className="header">
            <div id="greetings">
                <FontAwesomeIcon icon={faCloudSun} id="weather-logo" />
                <span id="greetings-day">Bom {getGreetingTime(ptMoment)}, </span>

                {user?.gender?.toLowerCase() === "male" ? "Dr. " : "Dra. "}
                {user?.name}

            </div>
            <div id="logout">
                <Button
                    className="form-elems red-button"
                    variant="contained"
                    color="inherit"
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
