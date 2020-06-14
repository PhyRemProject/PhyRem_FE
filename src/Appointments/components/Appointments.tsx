import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Container,
    Row,
    Col
} from "react-bootstrap";

import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import AppointmentReducer, { AppointmentInterface } from "../AppointmentReducer"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "../styles/appointments.css"
import { getAppointsBetween } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';


interface CalendarEvent {
    id: number,
    title: string,
    start: Date,
    end: Date,
    status: string
}

function Event({ event }: any) {
    console.log(event.status)
    return (
        <span>
            <strong>{event.title}</strong>
            <br />
            {event.status}
        </span>
    )
}


function Appointments() {

    const localizer = momentLocalizer(moment)
    const loadedAppoints = useSelector((state: AppointmentReducer) => state.AppointmentReducer.loadedAppoints)
    const loadedInterval = useSelector((state: AppointmentReducer) => state.AppointmentReducer.loadedInterval)
    const isFetching = useSelector((state: AppointmentReducer) => state.AppointmentReducer.isFetching)
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const [selectedAppoint, setSelectedAppoint] = useState<AppointmentInterface>();
    const [normalizedAppointments, setNormalizedAppointments] = useState<CalendarEvent[]>();

    const dispatch = useDispatch()


    //On component mount, populate the current week of appointments
    useEffect(() => {

        let start = moment(Date.now()).startOf('day');
        let end = moment(Date.now()).endOf('day');
        populateAppointments(start.toDate(), end.toDate());
        convertAppointments()

    }, [])

    const populateAppointments = (startDate: Date, endDate: Date) => {

        //No interval is loaded
        if (!loadedInterval[0] || !loadedInterval[1])
            dispatch(
                getAppointsBetween(
                    moment(startDate).subtract(15, "days").toDate(),
                    moment(endDate).add(15, "days").toDate(),
                    token
                )
            )


        //Requested dates fall outside of loaded interval
        else if (startDate.getTime() < new Date(loadedInterval[0]).getTime() || new Date(loadedInterval[1]).getTime() < endDate.getTime()) {
            dispatch(
                getAppointsBetween(
                    moment(startDate).subtract(15, "days").toDate(),
                    moment(endDate).add(15, "days").toDate(),
                    token
                )
            )
        }
        //Dates are inside of the loaded interval, no need to fetch
    }


    //Converts the raw appointments to React-Big-Calendar events 
    const convertAppointments = () => {
        let appoints = loadedAppoints.map((appoint: AppointmentInterface, index) => {
            return {
                id: index,
                title: appoint.patients_info.pop()?.name as string,
                start: moment(appoint.startDate).toDate(),
                end: moment(appoint.endDate).toDate(),
                status: appoint.status
            }
        })
        setNormalizedAppointments(appoints)
    }

    useMemo(() => convertAppointments(), [loadedAppoints]);


    const handleSelectAppointment = (event : CalendarEvent) => {
        setSelectedAppoint(loadedAppoints[event.id])
    }

    return (
        <Row className="overview">
            <Col xs="12" md="8" className="p-0 fill-height">

                <Calendar
                    localizer={localizer}
                    events={normalizedAppointments || []}
                    defaultView={'week'}
                    views={['day', 'week']}
                    min={new Date(0, 0, 0, 8, 0, 0)}
                    max={new Date(0, 0, 0, 20, 0, 0)}
                    startAccessor="start"
                    endAccessor="end"

                    components={{
                        event: Event as any
                    }}

                    onSelectEvent={handleSelectAppointment}

                    onNavigate={(date, view) => {
                        date.setHours(0, 0)
                        date.setSeconds(0, 0)
                        if (view === "week") {
                            let startWeek = moment(date).startOf('week');
                            let endWeek = moment(date).endOf('week');
                            populateAppointments(startWeek.toDate(), endWeek.toDate());
                        } else if (view === "day") {
                            let startDay = moment(date).startOf('day');
                            let endDay = moment(date).endOf('day');
                            populateAppointments(startDay.toDate(), endDay.toDate())
                        }

                    }}

                    onView={(view) => {
                    }}


                    eventPropGetter={
                        (event: CalendarEvent, start, end, isSelected) => {

                            if (event.status === "ACCEPTED")
                                return {
                                    style: { backgroundColor: "#EFAF48", color: "white" }
                                };

                            if (event.status === "REJECTED")
                                return {
                                    style: { backgroundColor: "#9D9CA9", color: "white" }
                                };

                            if (event.status === "REQUESTED")
                                return {
                                    style: { backgroundColor: "#AAA7F2", color: "white" }
                                };

                            return {}

                        }
                    }


                />
            </Col>
            <Col xs="12" md="4" className="p-0 fill-height">
                <div className="appoint-details">
                    <h5 id="details-title">Detalhes</h5>
                    <div id="details-info" >

                    {selectedAppoint?.patient}
                    {selectedAppoint?.startDate}
                    {selectedAppoint?.endDate}
                    {selectedAppoint?.objective}
                    {selectedAppoint?.status}


                    </div>
                </div>
            </Col>
        </Row>
    );

}

export default Appointments;
