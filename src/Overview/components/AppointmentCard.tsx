import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";



import moment from "moment"
import 'moment/locale/pt';

import Button from "@material-ui/core/Button";

import "../styles/appointment-card.css"
import UserReducer from '../../User/UserReducer';
import MapDialog from "../../Global/components/MapDialog"
import { PatientEvalInterface } from '../../PatientEvals/PatientEvalsActions';
import { GetAppointPatEval } from '../../Appointments/AppointmentActions';


interface AppointmentCardProps {
    data: {
        appointID: string,
        startDate: Date,
        endDate: Date,
        patientID: string,
        patientName: string,
        patientContact: string,
        patientAddress: string,
        objective: string,
        diagnostic: string,
        treatment: string,
        patientEval?: string
    }
}


function AppointmentCard(props: AppointmentCardProps) {

    //let location = useLocation().pathname;
    const [showMap, setShowMap] = useState(false);
    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    const [patEvalInfo, setPatEvalInfo] = useState<PatientEvalInterface>()

    useEffect(() => {
        if (props.data.patientEval !== undefined)
            GetAppointPatEval(token, props.data.patientEval, setPatEvalInfo)
    }, [])



    return (
        <Container className="appointment-card">
            <MapDialog showMap={showMap} setShowMap={setShowMap} />
            <Row>
                <Col xs={12} className="appointment-hour">
                    {moment(props.data.startDate).format("HH:mm")} - {moment(props.data.endDate).format("HH:mm")}
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <div className="center-content" >
                        <div style={{ height: "150px", width: "150px" }}>
                            <Image
                                className="user-image"
                                src={`${process.env.PUBLIC_URL}/api/patient/profileImage/${props.data.patientID}`}
                                roundedCircle
                                fluid
                                onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default_user_icon.png` }} />

                        </div>
                    </div>
                </Col>
                <Col xs={3}>
                    <span className="appointment-data">
                        Paciente
                        <p>{props.data.patientName}</p>
                    </span>
                    <span className="appointment-data">
                        Contacto
                        <p>{props.data.patientContact}</p>
                    </span>
                    <span className="appointment-data">
                        Localidade
                        <p>{props.data.patientAddress}</p>
                    </span>
                </Col>
                <Col xs={3}>
                    <span className="appointment-data">
                        Objectivo
                        <p>{props.data.objective}</p>
                    </span>
                    <span className="appointment-data">
                        Diagnóstico
                        <p>{patEvalInfo?.clinicDiagnosis}</p>
                    </span>
                    <span className="appointment-data">
                        Tratamento
                        <div style={{ textOverflow: "ellipsis" }}>
                            <p>{patEvalInfo?.medicalPrescription[0].prescription} ...</p>
                        </div>
                    </span>
                </Col>
                <Col xs={3}>
                    <Button
                        className="form-elems w-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => { setShowMap(true) }}
                    >
                        Ver Localização
                </Button>
                    <Button 
                        className="form-elems w-100 mt-1"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        component={Link}
                        to={"/dashboard/pateval/" + patEvalInfo?._id}
                    >
                        Ver Avaliação de Paciente
                </Button>
                    <Button
                        className="form-elems w-100 mt-4"
                        variant="contained"
                        color="primary"
                        type="submit"
                        component={Link}
                        to={"/dashboard/appointments/" + moment(props.data.startDate).format("DDMMYYYY") + "/" + props.data.appointID}
                    >
                        Ir para consulta
                </Button>



                </Col>
            </Row>
        </Container >
    );

}

export default AppointmentCard;
