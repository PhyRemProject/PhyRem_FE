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
    Button,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core';

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";


import UserReducer from '../../User/UserReducer';

import { createNewPatient } from "../OfficeActions"

function NewPatient() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [birthDate, setBirthDate] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [identificationNum, setIdentificationNum] = useState<string>("")
    const [fiscalNumber, setFiscalNumber] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const [submitStatus, setSubmitStatus] = useState<string>("editing")

    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const handleCreateNewPhysician = () => {
        createNewPatient(token,
            {
                role: "PATIENT",
                email,
                password,
                name,
                gender,
                birthDate,
                address,
                identificationNum,
                fiscalNumber,
                phoneNumber
            },
            setSubmitStatus
        )
    }

    return (

        <div className="h-100 w-100">
            <Row className="p-0 mt-2">
                <Col xs={12}>
                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setEmail(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                        <Col xs={4}>
                            <TextField
                                id="" label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPassword(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Name"
                                variant="outlined"
                                value={name}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setName(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Birthdate"
                                variant="outlined"
                                value={birthDate}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setBirthDate(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                        <Col xs={4}>
                            <TextField
                                id="" label="Gender"
                                variant="outlined"
                                value={gender}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setGender(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Address"
                                variant="outlined"
                                value={address}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setAddress(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Identification Number"
                                variant="outlined"
                                value={identificationNum}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setIdentificationNum(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                        <Col xs={4}>
                            <TextField
                                id="" label="Fiscal Number"
                                variant="outlined"
                                value={fiscalNumber}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setFiscalNumber(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>


                    <Row className="mt-5">
                        <Col xs={4}>
                            <TextField
                                id="" label="Phone Number"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPhoneNumber(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="w-100 mt-3">
                <Col sm={2}>
                    <Button
                        className="form-elems w-100"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => { handleCreateNewPhysician() }}
                    >
                        {"Criar"}
                    </Button>
                </Col>

                <Col sm={3}>
                    {submitStatus === "uploading" ?
                        <p>A Submeter ...</p>
                        : submitStatus === "complete" ?
                            <p>Guardado!</p> :
                            submitStatus === "error" ?
                                <p>Ocorreu um erro ao gravar!</p>
                                :
                                <></>
                    }
                </Col>
            </Row>

        </div>
    );
}

export default NewPatient;
