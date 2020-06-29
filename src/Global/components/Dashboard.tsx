import React from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Sidebar from "./Sidebar";
import Header from "./Header"
import Overview from "../../Overview/components/Overview"
import Appointments from "../../Appointments/components/Appointments"
import Patients from "../../Patients/components/Patients"

import "../styles/dashboard.css"

function Dashboard() {

    let {path, url} = useRouteMatch();

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
                    <Col xs="12" className="dashboard-content p-0">
                        <Switch>
                            <Route exact path={path} component={Overview} />
                            <Route exact path={`${path}/appointments`} component={Appointments} />
                            <Route path={`${path}/patients`} component={Patients} />
                        </Switch>

                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Dashboard;
