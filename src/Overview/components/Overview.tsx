import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    Button,
    Container,
    Row,
    Col
} from "react-bootstrap";
import moment from "moment"
import 'moment/locale/pt';

import AppointmentCard from "./AppointmentCard"

import "../styles/overview.css"

function Overview() {

    var ptMoment = moment();
    ptMoment.locale('pt');

    return (
        <Row className="overview">
            <Col xs="12" md="8" className="p-0 fill-height">
                <div className="home">
                    <h2 id="today-date">Hoje, {(ptMoment.format("DD") + " de " + ptMoment.format("MMMM"))}</h2>
                    <div id="spacer" ></div>
                    <AppointmentCard />
                    <AppointmentCard />
                    <AppointmentCard />
                    <AppointmentCard />
                    <AppointmentCard />
                    <AppointmentCard />
                    <AppointmentCard />

                </div>
            </Col>
            <Col xs="12" md="4" className="p-0 fill-height">
                <div className="feed">
                    <h5 id="feed-title">Actividade Recente</h5>
                    <div id="spacer" ></div>


                </div>
            </Col>
        </Row>
    );

}

export default Overview;
