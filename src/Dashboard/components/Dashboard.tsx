import React from 'react';
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import logo from './logo.svg';


function Dashboard() {

    return (

        <Container>
            <Row>
                <Col xs={12}>
                    Dashboard
                </Col>
            </Row>
        </Container>

    );

}

export default Dashboard;
