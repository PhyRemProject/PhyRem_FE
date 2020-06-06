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
            {/* Active view */}
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <Header />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <Overview />
                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Dashboard;
