import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AttemptLogin } from "../User/UserActions"

import Scroll from 'react-scroll';
import {
    Nav,
    Navbar,
    NavDropdown,
    Form,
    FormControl,
    Row,
    Container,
    Col,
    Spinner
} from "react-bootstrap";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./home.css"
import logo from "./images/logo.png"
import medic_img from "./images/undraw_doctors_hwty.svg"
import sensors_img from "./images/sensor_illustration-01.svg"
import phone_img from "./images/phone_illustration.svg"
import appstore from "./images/appstore.svg"
import playstore from "./images/playstore.svg"
import UserReducer from '../User/UserReducer';

function Home() {


    const [email, setEmail] = useState("doctor1@mail.com");
    const [password, setPassword] = useState("asdzxc");
    const [status, setStatus] = useState("idle");

    const loading = useSelector((state: UserReducer) => state.UserReducer.isLogging)
    const dispatch = useDispatch();


    const attemptLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("attempting login")
        dispatch(AttemptLogin(email, password, setStatus));
    }

    return (
        <>
            <Navbar fixed="top" bg="white" expand="lg" className="navbar">
                <Navbar.Brand href="#home"><img src={logo} width="110px" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            className="nav-link"
                            href="#home"
                            onSelect={() => Scroll.scroller.scrollTo('home', {
                                smooth: true,
                                offset: -70,
                                duration: 700,
                            })}
                        >
                            Médicos
                        </Nav.Link>
                        <Nav.Link
                            className="nav-link"
                            href="#patients"
                            onSelect={() => Scroll.scroller.scrollTo('patients', {
                                smooth: true,
                                offset: -70,
                                duration: 700,
                            })}
                        >
                            Pacientes
                        </Nav.Link>
                        <Nav.Link
                            className="nav-link"
                            href="#sensors"
                            onSelect={() => Scroll.scroller.scrollTo('sensors', {
                                smooth: true,
                                offset: -70,
                                duration: 700,
                            })}
                        >
                            Sensores
                        </Nav.Link>
                        <Nav.Link
                            className="nav-link"
                            href="#contacts"
                            onSelect={() => Scroll.scroller.scrollTo('contacts', {
                                smooth: true,
                                offset: -70,
                                duration: 700,
                            })}
                        >
                            Contactos
                        </Nav.Link>
                        <Nav.Link
                            className="nav-link"
                            href="#about"
                            onSelect={() => Scroll.scroller.scrollTo('about', {
                                smooth: true,
                                offset: -70,
                                duration: 700,
                            })}
                        >
                            Sobre nós
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container fluid id="home">
                <Row className="hero">
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 1 }} id="medics" >
                        <img id="medics-img" src={medic_img} alt="Physicians" />
                    </Col>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 2 }} id="subtitle">
                        <h4><b>Fisioterapia</b> à distância <br /> com a mesma eficácia e carinho</h4>
                    </Col>
                    <Col xs={{ span: 12, order: -1 }} md={{ span: 4, order: 2 }} lg={{ span: 4, order: 3 }} id="login">
                        <form id="login-form" noValidate autoComplete="off" onSubmit={e => attemptLogin(e)}>
                            <TextField
                                id="email"
                                className="form-elems"
                                label="Email Médico"
                                variant="standard"
                                fullWidth
                                onChange={e => setEmail(e.currentTarget.value)}
                            />
                            <TextField
                                id="password"
                                className="form-elems"
                                label="Password"
                                type="password"
                                variant="standard"
                                fullWidth
                                onChange={e => setPassword(e.currentTarget.value)}
                            />

                            {status === "failed" ?
                                <p id="failed-login">Email ou password errados</p> :
                                <></>
                            }

                            <div id="login-options">
                                <a id="forgot" href="/recover">Esqueceu-se da password?</a>
                                <Button
                                    id="login-button"
                                    className="form-elems"
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    {
                                        status === "idle" && loading ?
                                            <Spinner animation="border" /> :
                                            status === "success" ?
                                                <>✔</>
                                                : <>Entrar</>
                                    }
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
                <Row className="sensors" id="sensors">
                    <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }} lg={{ span: 6, order: 1 }}>
                        <h1><b>Sensores</b></h1>
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

                <Row className="patients" id="patients">
                    <Col id="patients-text" xs={{ span: 12, order: 1 }} md={{ span: 6, order: 1 }} lg={{ span: 6, order: 1 }}>

                        <h1 id="patient-title"><b>Pacientes</b></h1>

                        <p>
                            <b>Phy</b>Rem é desenhado para ser usado em qualquer lugar, a qualquer altura. É uma experiência móvel
                        </p>
                        <br />
                        <p>
                            Faça o download da <b>Phy</b>Rem app a partir da loja de aplicações do seu telemóvel
                        </p>
                        <img id="appstore" src={appstore} alt="Apple Store" />
                        <img id="playstore" src={playstore} alt="Google Play Store" />

                    </Col>
                    <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 2 }} lg={{ span: 6, order: 2 }}>
                        <img id="phone-img" src={phone_img} alt="Smartphone" />
                    </Col>
                </Row>


            </Container>

        </>
    );

}

export default Home;
