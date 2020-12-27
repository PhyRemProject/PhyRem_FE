import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment"
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

import { createNewPhysician } from "../OfficeActions"
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

function NewPhysician() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConf, setPasswordConf] = useState<string>("")
    const [physicianID, setPhysicianID] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [specialty, setSpecialty] = useState<string[]>([])
    const [gender, setGender] = useState<string>("")
    const [birthDate, setBirthDate] = useState<Date>(moment(new Date(), "YYYY-MM-DD HH:mm").toDate())
    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const defaultUserPic = process.env.REACT_APP_PUBLIC_URL + "/images/default_user_icon.png"
    const [selectedFile, setSelectedFile] = useState<string | undefined>()
    const [preview, setPreview] = useState<string | undefined>(defaultUserPic)


    const [submitStatus, setSubmitStatus] = useState<string>("editing")


    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string

    const handleCreateNewPhysician = () => {
        createNewPhysician(token,
            {
                email,
                password,
                physicianID,
                name,
                role: "PHYSICIAN",
                specialty: specialty,
                gender,
                birthDate,
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
                                id=""
                                label="Email"
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
                                label="PhysicianID"
                                variant="outlined"
                                value={physicianID}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPhysicianID(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
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
                        <Col xs={6}>
                            <TextField
                                id=""
                                label="Confirmação de Password"
                                type="password"
                                variant="outlined"
                                value={passwordConf}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setPasswordConf(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={6}>
                            <TextField
                                id="" label="Nome"
                                variant="outlined"
                                value={name}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setName(event.target.value as string)
                                }}
                                className={"w-100"}
                            />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs={6}>
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
                            <InputLabel>Especialidade</InputLabel>
                            <Select
                                className={"w-100"}
                                labelId=""
                                id=""
                                required
                                multiple
                                value={specialty}
                                renderValue={(selected) => (selected as string[]).join(', ')}
                                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                    setSpecialty(event.target.value as string[])
                                }}
                            >

                                <MenuItem value={"PHYSIATRIST"}>
                                    <Checkbox checked={specialty.indexOf("PHYSIATRIST") > -1} />
                                    Fisiatra
                                </MenuItem>
                                <MenuItem value={"PHYSIOTHERAPIST"}>
                                    <Checkbox checked={specialty.indexOf("PHYSIOTHERAPIST") > -1} />
                                    Fisioterapeuta
                                </MenuItem>
                            </Select>

                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <TextField
                                id=""
                                label="Número de Telemóvel"
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

export default NewPhysician;
