import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Container,
    Row,
    Col
} from "react-bootstrap";
import moment from "moment"
import 'moment/locale/pt';
import {
    IconDefinition,
    faGripLines
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppointmentCard from "./AppointmentCard"

import "../styles/overview.css"

import { UserReducer } from '../../User/UserReducer';
import { getTodaysAppoints } from '../../Appointments/AppointmentActions';
import { AppointmentReducer, AppointmentInterface } from '../../Appointments/AppointmentReducer';
import { PatientInterface } from '../../User/components/Patients';

function Overview() {

    /** Today's date**/
    var ptMoment = moment();
    ptMoment.locale('pt');

    /** Token to use for requests**/
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const todaysAppoints = useSelector((state: AppointmentReducer) => state.AppointmentReducer.todaysAppointments)
    const dispatch = useDispatch();

    const fetchAppointmentList = () => {
        dispatch(getTodaysAppoints(token))
    }

    useEffect(() => {
        fetchAppointmentList()
    }, [])


    console.log(todaysAppoints)

    return (
        <Row className="overview">
            <Col xs="12" md="8" className="p-0 fill-height">
                <div className="home fill-height">
                    <h2 id="today-date">Hoje, {(ptMoment.format("DD") + " de " + ptMoment.format("MMMM"))}</h2>
                    <div id="appointments">
                        {todaysAppoints.length === 0 ?
                            <p id="no-appointments">Não existem consultas agendadas para hoje 😄</p>
                            : <></>
                        }

                        {todaysAppoints.map((appoint: AppointmentInterface, index: number) => {

                            return <AppointmentCard key={index} data={
                                {
                                    startDate: appoint.startDate as Date,
                                    endDate: appoint.endDate as Date,
                                    patientName: appoint.patientsInfo.name as string,
                                    patientContact: appoint.patientsInfo.phoneNumber as string,
                                    patientAddress: appoint.location as string,
                                    objective: appoint.objective as string,
                                    diagnostic: appoint.diagnostic as string,
                                    treatment: appoint.treatment as string,
                                }} />
                        }
                        )}

                        <div id="spacer">
                            <FontAwesomeIcon icon={faGripLines} id="weather-logo" />
                        </div>
                    </div>


                </div>
            </Col>
            <Col xs="12" md="4" className="p-0 fill-height">
                <div className="feed">
                    <h5 id="feed-title">Actividade Recente</h5>
                    <div id="feed-cards" >

                        {/* content goes here */}


                        <div id="spacer">
                            <FontAwesomeIcon icon={faGripLines} id="weather-logo" />
                        </div>

                    </div>
                </div>
            </Col>
        </Row>
    );

}

export default Overview;
