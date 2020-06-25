import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import Button from "@material-ui/core/Button";

import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"

import AppointmentReducer, { AppointmentInterface } from "../AppointmentReducer"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "../styles/appointments.css"
import { getAppointsBetween } from '../AppointmentActions';
import UserReducer from '../../User/UserReducer';
import { PatientInterface } from '../../User/components/Patients';
import AppointmentDetails from "./AppointmentDetails"
import NewAppointmentForm from './NewAppointmentForm';


interface CalendarEvent {
    id: number,
    title: string,
    start: Date,
    end: Date,
    status: string
}

function Event({ event }: any) {
    return (
        <span>
            <strong>{event.title}</strong>
            <br />
            {event.status}
        </span>
    )
}

const calendarColoring = (event: CalendarEvent, start: any, end: any, isSelected: any) => {
    if (event.status === "ACCEPTED") {
        if (isSelected)
            return { style: { backgroundColor: "#D99A35", color: "white" } };
        else
            return { style: { backgroundColor: "#EFAF48", color: "white" } };
    }

    if (event.status === "REJECTED") {
        if (isSelected)
            return { style: { backgroundColor: "#75747D", color: "white" } };
        else
            return { style: { backgroundColor: "#9D9CA9", color: "white" } };
    }

    if (event.status === "REQUESTED") {
        if (isSelected)
            return { style: { backgroundColor: "#AAA7F2", color: "white" } };
        else
            return { style: { backgroundColor: "#8B88D3", color: "white" } };
    }

    return {}
}


function Appointments() {

    const localizer = momentLocalizer(moment)
    const loadedAppoints = useSelector((state: AppointmentReducer) => state.AppointmentReducer.loadedAppoints)
    const loadedInterval = useSelector((state: AppointmentReducer) => state.AppointmentReducer.loadedInterval)
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const [selectedAppoint, setSelectedAppoint] = useState<number>();
    const [currentFilter, setCurrentFilter] = useState("ALL");
    const [normalizedAppointments, setNormalizedAppointments] = useState<CalendarEvent[]>([]);
    const [displayedAppoints, setDisplayedAppoints] = useState<CalendarEvent[]>([]);
    const [creatingAppoint, setCreatingAppoint] = useState<boolean>(false);

    const dispatch = useDispatch()


    //On component mount, populate the current week of appointments
    useEffect(() => {

        let start = moment(Date.now()).startOf('day');
        let end = moment(Date.now()).endOf('day');
        populateAppointments(start.toDate(), end.toDate());
        convertAppointments()

    }, [])

    useEffect(() => {
        if (currentFilter === "ALL")
            setDisplayedAppoints(normalizedAppointments)
        else if (currentFilter === "ACCEPTED") {
            let tempAppoints = normalizedAppointments.map((appoint, index) => {
                if (appoint.status === "ACCEPTED")
                    return appoint
            })
            setDisplayedAppoints(tempAppoints as any)
        } else if (currentFilter === "REQUESTED") {
            let tempAppoints = normalizedAppointments.map((appoint, index) => {
                if (appoint.status === "REQUESTED")
                    return appoint
            })
            setDisplayedAppoints(tempAppoints as any)
        }

    }, [currentFilter])

    const populateAppointments = (startDate: Date, endDate: Date) => {

        //No interval is loaded
        if (!loadedInterval ||  !loadedInterval[0] || !loadedInterval[1])
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
        if (!loadedAppoints){
            setNormalizedAppointments([])
            setCurrentFilter("ALL")
            setDisplayedAppoints([])
            return
        }
        let appoints = loadedAppoints.map((appoint: AppointmentInterface, index) => {
            return {
                id: index,
                title: appoint.patientsInfo.name as string,
                start: moment(appoint.startDate).toDate(),
                end: moment(appoint.endDate).toDate(),
                status: appoint.status
            }
        })
        setNormalizedAppointments(appoints)
        setCurrentFilter("ALL")
        setDisplayedAppoints(appoints)
    }
    useMemo(() => convertAppointments(), [loadedAppoints]);


    const handleSelectAppointment = (event: CalendarEvent) => {
        setSelectedAppoint(event.id)
    }

    const handleFilterChange = (filter: string) => {
        setCurrentFilter(filter)
    }


    return (
        <Row className="overview">
            <Col xs="12" md="8" className="p-0 fill-height">

                <Calendar
                    localizer={localizer}
                    events={displayedAppoints || []}
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

                    eventPropGetter={calendarColoring}

                />
            </Col>
            <Col xs="12" md="4" className="p-0 fill-height">
                <div className="appoint-details">
                    <Container fluid>
                        <Row>
                            <Col xs={4} className="p-0">
                                <Button
                                    className="form-elems w-100"
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={() => handleFilterChange("ALL")}
                                >
                                    Todos
                </Button>
                            </Col>
                            <Col xs={4} className="p-0">

                                <Button
                                    className="form-elems w-100"
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={() => handleFilterChange("ACCEPTED")}
                                >
                                    Confirmados
                </Button>
                            </Col>

                            <Col xs={4} className="p-0">

                                <Button
                                    className="form-elems w-100"
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={() => handleFilterChange("REQUESTED")}

                                >
                                    Pedidos
                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <Container className="appoint-actions-container">
                        {!creatingAppoint ?

                            <AppointmentDetails selectedAppoint={selectedAppoint} loadedAppoints={loadedAppoints} />
                            :
                            <NewAppointmentForm />

                        }

                        {creatingAppoint ?
                            <Button
                                className="form-elems w-100"
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={() => { setCreatingAppoint(false) }}
                            >
                                Cancelar
                    </Button>
                            :
                            <Button
                                className="form-elems w-100"
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={() => { setCreatingAppoint(true) }}
                            >
                                Nova Consulta
                        </Button>
                        }

                    </Container>

                </div>
            </Col>
        </Row >
    );

}

export default Appointments;
