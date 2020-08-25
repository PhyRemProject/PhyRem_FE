import React, { useState, useEffect, useMemo } from 'react';
import { Switch, Route, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    Container,
    Row,
    Col,
    Image
} from "react-bootstrap";

import {
    TextField,
    Button
} from '@material-ui/core';

import {
    faSearch
} from "@fortawesome/free-solid-svg-icons";
import NewPhysician from './NewPhysician';
import NewPatient from './NewPatient';
import { PatientInterface } from '../../User/components/Patients';
import UserReducer from '../../User/UserReducer';
import PatientReducer from '../../Patients/PatientReducer';
import { GetPatientsWithName } from '../../Patients/PatientActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PatientCard from '../../Patients/components/PatientCard';
import { getAllPatients, getPatientsWithName, getAllPhysicians, PhysicianInterface } from '../OfficeActions';
import PhysicianCard from './PhysicianCard';


interface AllPatientsListProps {
    searchResult: PhysicianInterface[],
    filterTerm: string,
    prevFilterTerm: string
}

function AllPhysicianList(props: AllPatientsListProps) {


    const token = useSelector((state: UserReducer) => state.UserReducer.user?.token) as string
    //const patientList = useSelector((state: PatientReducer) => state.PatientReducer.loadedPatients)
    const [patientList, setPatientList] = useState<PhysicianInterface[]>([])

    const [fetchStatus, setFetchStatus] = useState("idle")
    const [loadedMore, setLoadedMore] = useState(true)

    const dispatch = useDispatch();

    useEffect(() => {
        getAllPhysicians(token, Date.now(), setFetchStatus)
            .then((value) => {
                setPatientList(value as PhysicianInterface[])
            })
            .catch(() => { })
    }, [])

    const loadMore = () => {
        getAllPhysicians(token, patientList[patientList.length - 1].creationDate as number, setFetchStatus)
            .then((value) => {
                if ((value as PhysicianInterface[]).length === 0)
                    setLoadedMore(false)
                setPatientList(patientList.concat(value as PhysicianInterface[]))
            })
            .catch(() => { })
    }

    return (
        <>
            <Row className="p-0 h-100">
                <Col xs={12} className={"h-100"}>
                    <Row id="patient-list-header">
                        <Col xs={2}>
                            <b>Médicos</b>
                        </Col>
                        <Col xs={3}>
                            Nome
        </Col>
                        <Col xs={2}>
                            Contacto
        </Col>
                        <Col xs={2}>
                            Especialidades
        </Col>
                        <Col xs={2}>
                            Identificador
        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row className="h-100 scroll patient-list-content">

                        {/* If the PatientList is null, an error occured during fetch */}
                        {patientList === null ?
                            <p className="w-100 text-center">Ocorreu um erro a carregar</p>
                            : fetchStatus === "loading" ?
                                <p className="w-100 text-center">A Carregar ...</p>
                                :
                                fetchStatus === "error" ?
                                    <p className="w-100 text-center">Ocorreu um erro a carregar</p>
                                    : fetchStatus === "complete" ?
                                        props.searchResult.length === 0 && props.prevFilterTerm !== "" ?
                                            <p>Não foram encontrados resultados com nome "{props.prevFilterTerm}"</p>
                                            :
                                            props.searchResult.length !== 0 && props.filterTerm !== "" ?
                                                props.searchResult.map((patient: PhysicianInterface, index: number) => {

                                                    return <PhysicianCard data={
                                                        {
                                                            id: patient._id as string,
                                                            name: patient.name as string,
                                                            email: patient.email as string,
                                                            phoneNumber: patient.phoneNumber as string,
                                                            specialty: patient.specialty as string[],
                                                            physicianID: patient.physicianID as string
                                                        }
                                                    }
                                                        key={index}
                                                    />
                                                })
                                                : <>
                                                    {// If filterResult is null, a filter is not being applied, therefore, show the patient list
                                                        patientList.map((patient: PhysicianInterface, index: number) => {

                                                            return <PhysicianCard data={
                                                                {
                                                                    id: patient._id as string,
                                                                    name: patient.name as string,
                                                                    email: patient.email as string,
                                                                    phoneNumber: patient.phoneNumber as string,
                                                                    specialty: patient.specialty as string[],
                                                                    physicianID: patient.physicianID as string
                                                                }
                                                            }
                                                                key={index}
                                                            />
                                                        })
                                                    }
                                                    {
                                                        loadedMore ?
                                                            <div className="w-100 text-center">
                                                                < Button
                                                                    className=""
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    type="submit"
                                                                    onClick={loadMore}
                                                                >
                                                                    {"Carregar mais"}
                                                                </Button>
                                                            </div> :
                                                            <p className="w-100 text-center">
                                                                Não existem mais pacientes
                                                    </p>
                                                    }

                                                </>
                                        : <></>
                        }

                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default AllPhysicianList;







