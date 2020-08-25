import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import {
    TextField,
    Button
} from '@material-ui/core';

import {
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PatientCardProps {
    data: {
        id: string,
        name: string,
        email: string,
        phoneNumber: string,
        specialty: string[],
        physicianID: string,
    }
    //TODO this has to be completed
}


function PhysicianCard(props: PatientCardProps) {

    return (
        <div className="patient-card">
            <Row className="h-100">
                <Col sm={2} className="h-100">
                    <Image src={`${process.env.PUBLIC_URL}/api/physician/profileImage/${props.data.id}`} roundedCircle fluid id="patient-info-image" onError={(e) => { e.currentTarget.src = `${process.env.PUBLIC_URL}/images/default_user_icon.png` }} />
                </Col>
                <Col sm={3} className="h-100">
                    <span className="align-middle h-100">
                        {props.data.name}<br />
                        {props.data.email}
                    </span>
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.phoneNumber}<br />
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.specialty.map((elem, index) => (<p>{elem}</p>))}<br />
                </Col>
                <Col sm={2} className="h-100">
                    {props.data.physicianID}<br />
                </Col>
                <Col sm={1} className="h-100">
                    {/* <Button
                        className="form-elems w-100 h-100"
                        variant="contained"
                        color="secondary"
                        type="submit"
                        component={Link}
                        to={"/dashboard/patients/" + props.data.id}
                        onClick={() => { }}
                    >
                            <FontAwesomeIcon icon={faEye} id="eye-logo" />
                            <br />
                            {"Ver"}
                    </Button> */}
                </Col>

            </Row>
        </div>
    );
}

export default PhysicianCard;
