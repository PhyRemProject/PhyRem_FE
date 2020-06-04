import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';
import Sidebar from './Sidebar';

import "../styles/dashboard.css"

function Dashboard() {

    return (
        <div className="dashboard">
            <Sidebar />
            <Container fluid>
                <Row>
                    <Col xs={12}>
                        Dashboard
                </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Dashboard;
