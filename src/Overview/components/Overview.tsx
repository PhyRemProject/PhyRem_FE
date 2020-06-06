import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";

import "../styles/overview.css"

function Overview() {

    return (
        <Container fluid>
            <Row>
                <Col className="home" xs="12" md="9" >
                    Home
                </Col>
                <Col className="feed" xs="12" md="3">
                    Feed
                </Col>
            </Row>
        </Container>
    );

}

export default Overview;
