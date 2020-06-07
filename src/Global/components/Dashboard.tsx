import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Sidebar from "./Sidebar";
import Header from "./Header"
import Overview from "../../Overview/components/Overview"

import "../styles/dashboard.css"

function Dashboard() {

    return (
        <div className="dashboard">
            <Sidebar />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <Header />
                    </Col>
                </Row>
            {/* Active view */}
                <Row className="dashboard-content">
                    <Col xs="12" className="dashboard-content">
                        <Overview />
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Dashboard;
