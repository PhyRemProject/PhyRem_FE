import React from 'react';
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Row,
    Container,
    Col
} from "react-bootstrap";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { sizing } from '@material-ui/system';

import "./home.css"
import logo from "./images/logo.png"
import medic_img from "./images/undraw_doctors_hwty.svg"
import sensors_img from "./images/sensor_illustration-01.svg"

function Home() {

    return (
        <>
            <Navbar bg="white" expand="lg" className="navbar">
                <Navbar.Brand href="#home"><img src={logo} width="110px" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link className="nav-link" href="#patients">Pacientes</Nav.Link>
                        <Nav.Link className="nav-link" href="#physicians">Médicos</Nav.Link>
                        <Nav.Link className="nav-link">Contactos</Nav.Link>
                        <Nav.Link className="nav-link">Sobre nós</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid id="content">
                <Row className="hero" >
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 1 }} id="medics" >
                        <img id="medics-img" src={medic_img} alt="Physicians" />
                    </Col>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 2 }} id="subtitle">
                        <h4><b>Fisioterapia</b> à distância <br /> com a mesma eficácia e carinho</h4>
                    </Col>
                    <Col xs={{ span: 12, order: -1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 3 }} id="login">
                        <form id="login-form" noValidate autoComplete="off">
                            <TextField
                                id="email"
                                className="form-elems"
                                label="Email Médico"
                                variant="standard"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                className="form-elems"
                                label="Password"
                                type="password"
                                variant="standard"
                                fullWidth
                            />

                            <div id="login-options">
                                <a id="forgot" href="/recover">Esqueceu-se da password?</a>
                                <Button
                                    id="login-button"
                                    className="form-elems"
                                    variant="contained"
                                    color="primary"
                                >
                                    Entrar
                                </Button>
                            </div>
                        </form>
                    </Col>
                </Row>
                <Row className="separator">
                    <Col xs={{ span: 4, order: 1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 1 }}>
                        1. <b>Contacte</b> o seu médico <br />em qualquer momento
                    </Col>
                    <Col xs={{ span: 4, order: 1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 1 }}>
                        2. <b>Agende</b> e registe todas as<br /> notas e detalhes de uma consulta
                    </Col>
                    <Col xs={{ span: 4, order: 1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 1 }}>
                        3. Veja a sua evolução no tratamento<br /> através de <b>sensores de movimento</b>
                    </Col>
                </Row>
                <Row className="sensors">
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }} lg={{ span: 6, order: 1 }}>
                        <p>
                            Registe a sua evolução no tratamento vestindo um conjunto de sensores
                        </p>
                        <br />
                        <p>
                            Os dados registados por estes sensores irão ajudar pacientes e fisioterapeutas com dados adicionais detalhados, resultando num melhor serviço de saúde
                        </p>
                    </Col>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 2 }} lg={{ span: 6, order: 2 }}>
                        <img id="sensors-img" src={sensors_img} alt="Sensors" />
                    </Col>

                </Row>

            </Container>


        </>
    );

}

export default Home;
