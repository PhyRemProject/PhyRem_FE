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
import { DateTimePicker, KeyboardDateTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment"
import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";


import UserReducer from '../../User/UserReducer';

import { createNewPatient } from "../OfficeActions"

import "../styles/office.css"

import axios from 'axios'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';


function NewPatient() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [gender, setGender] = useState<string>("")
    const [birthDate, setBirthDate] = useState<Date>(moment(new Date(), "YYYY-MM-DD HH:mm").toDate())
    const [address, setAddress] = useState<string>("")
    const [identificationNum, setIdentificationNum] = useState<string>("")
    const [fiscalNumber, setFiscalNumber] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const defaultUserPic = process.env.REACT_APP_PUBLIC_URL + "/images/default_user_icon.png"
    const [selectedFile, setSelectedFile] = useState<string | undefined>()
    const [preview, setPreview] = useState<string | undefined>(defaultUserPic)

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
            selectedFile,
            setSubmitStatus
        )
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(defaultUserPic)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleImageSelection = (event: any) => {

        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(event.target.files[0])
    }

    return (
        <>
            <Row>
                <Col xs={8}>
                    <Row>
                        <Col xs={6}>
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
                        <Col xs={6}>
                            <TextField
                                id=""
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPassword(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs={6}>
                            <TextField
                                id=""
                                label="Nome"
                                variant="outlined"
                                value={name}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setName(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                        <Col xs={6}>
                            <TextField
                                id=""
                                label="Confirmação de password"
                                type="password"
                                variant="outlined"
                                value={passwordConf}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPasswordConf(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                            {password !== passwordConf ?
                                <small>Passwords diferentes</small>
                                : <></>}
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs={6}>

                            {/* 
                                BACKUP
                            <DateTimePicker
                                variant="inline"
                                color="secondary"
                                ampm={false}
                                label="Data de Nascimento"
                                format="YYYY-MM-DD HH:mm"
                                value={birthDate}
                                onChange={(date: any) => {
                                    console.log(date)
                                    setBirthDate(date.toDate())
                                }}
                            /> */}

                            <KeyboardDatePicker
                                variant="inline"
                                color="secondary"
                                label="Data de Nascimento"
                                format="YYYY-MM-DD"
                                disableFuture
                                value={birthDate}
                                onChange={(date: MaterialUiPickersDate) => {
                                    console.log(date)
                                    let tempDate = date?.toDate() as Date
                                    tempDate.setUTCHours(0, 0, 0, 0)
                                    setBirthDate(tempDate)
                                }}
                            />



                        </Col>
                        <Col xs={6}>
                            <InputLabel>Sexo</InputLabel>
                            <Select
                                className={"w-100"}
                                labelId=""
                                id=""
                                required
                                value={gender}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setGender(event.target.value as string)
                                }}
                            >
                                <MenuItem value={"male"}>
                                    Masculino
                                </MenuItem>
                                <MenuItem value={"female"}>
                                    Feminino
                                </MenuItem>
                                <MenuItem value={"other"}>
                                    Outro
                                </MenuItem>
                                <MenuItem value={"not specified"}>
                                    Não Especificar
                                </MenuItem>
                            </Select>

                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <TextField
                                id="" label="Morada"
                                variant="outlined"
                                value={address}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setAddress(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs={6}>
                            <TextField
                                id="" label="(CC) Cartão de Cidadão"
                                variant="outlined"
                                value={identificationNum}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setIdentificationNum(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                        <Col xs={6}>
                            <TextField
                                id="" label="(NIF) Número de Identificação Fiscal"
                                variant="outlined"
                                value={fiscalNumber}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setFiscalNumber(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>


                    <Row className="mt-2">
                        <Col xs={6}>
                            <TextField
                                id="" label="Telemóvel"
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
                <Col xs={4} className={"text-center"}>
                    <Image
                        src={preview}
                        className={"new-user-image"}
                        roundedCircle
                        fluid
                    />
                    <br />
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        type="file"
                        onChange={handleImageSelection}
                    />
                    <label htmlFor="raised-button-file">
                        <Button
                            className="mt-4"
                            variant="contained"
                            color="secondary"
                            component="span"
                        >
                            Escolher Imagem
                        </Button>
                    </label>
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
                            submitStatus.indexOf("error") > -1 ?
                                <>
                                    <p>Ocorreu um erro ao gravar!</p>
                                    <p>{submitStatus}</p>
                                </>
                                :
                                <></>
                    }
                </Col>
            </Row>
        </>
    );
}

export default NewPatient;
