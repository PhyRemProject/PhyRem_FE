import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import history from './history'

import Sidebar from "./Sidebar";
import Header from "./Header"
import Overview from "../../Overview/components/Overview"
import Appointments from "../../Appointments/components/Appointments"
import Patients from "../../Patients/components/Patients"

import "../styles/dashboard.css"
import PatEvals from '../../PatientEvals/components/PatEvals';
import PhysioEval from '../../PhysioEvals/components/PhysioEvals';
import Office from '../../Office/components/Office';
import UserReducer from '../../User/UserReducer';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Exercise from '../../Exercise/components/Exercise';

function Dashboard() {

    let { path, url } = useRouteMatch();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setTimeout(() => {setOpen(true)}, 29 * 60 * 1000);
    }, [])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        history.push("/")
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <Container fluid>
                <Row>
                    <Col xs="12">
                        <Header />
                        <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            >
                            <Alert onClose={handleClose} severity="warning">
                                A sessão terminou, faça login novamente
                            </Alert>
                        </Snackbar>
                    </Col>
                </Row>
                {/* Active view */}
                <Row className="dashboard-content">
                    <Col xs="12" className="dashboard-content p-0">
                        <Switch>
                            <Route exact path={path} component={Overview} />
                            <Route path={`${path}/appointments`} component={Appointments} />
                            <Route path={`${path}/patients`} component={Patients} />
                            <Route path={`${path}/pateval`} component={PatEvals} />
                            <Route path={`${path}/physioeval`} component={PhysioEval} />
                            <Route path={`${path}/office`} component={Office} />
                            <Route path={`${path}/exercise`} component={() => <Exercise fullInterface />} /> {/*DEBUG ONLY ROUTE*/}
                        </Switch>

                    </Col>
                </Row>
            </Container>
        </div>
    );

}

export default Dashboard;
