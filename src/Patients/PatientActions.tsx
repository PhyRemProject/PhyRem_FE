import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"
import { GET_PHYSICIANS_PATIENTS, GET_PHYSICIANS_PATIENTS_COMPLETE, GET_PHYSICIANS_PATIENTS_FAILED, GET_PATIENTS_WITH_NAME, GET_PATIENTS_WITH_NAME_COMPLETE, GET_PATIENTS_WITH_NAME_FAILED, GET_PATIENT_INFO, GET_PATIENT_INFO_FAILED, GET_PATIENT_INFO_COMPLETE, ADOPT_PATIENT, ADOPT_PATIENT_COMPLETE, ADOPT_PATIENT_FAILED, DROP_PATIENT_FAILED, DROP_PATIENT, DROP_PATIENT_COMPLETE } from './PatientReducer'


const BE_URL = "/api/"

export const GetAdoptedPatientList = (token: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: GET_PHYSICIANS_PATIENTS
        });

        axios.get(BE_URL + 'physician/patients', options)
            .then(function (response) {

                dispatch({
                    type: GET_PHYSICIANS_PATIENTS_COMPLETE,
                    payload: response.data
                });

                console.log(response.data)

            })
            .catch(function (error) {
                console.log("FETCH PHYSICIAN PATIENTS FAILED")

                dispatch({
                    type: GET_PHYSICIANS_PATIENTS_FAILED
                });

            })
            .finally(function () {

            });
    }
}


export const GetPatientsWithName = (token: string, name: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token },
            params: {
                name
            }
        }

        dispatch({
            type: GET_PATIENTS_WITH_NAME
        });

        axios.get(BE_URL + 'patient/search', options)
            .then(function (response) {

                dispatch({
                    type: GET_PATIENTS_WITH_NAME_COMPLETE,
                    payload: response.data
                });

                console.log(response.data)

            })
            .catch(function (error) {
                console.log("FETCH PATIENT By name FAILED")

                dispatch({
                    type: GET_PATIENTS_WITH_NAME_FAILED
                });

            })
            .finally(function () {

            });
    }
}


export const GetPatientInfoByID = (token: string, id: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: GET_PATIENT_INFO
        });

        axios.get(BE_URL + 'patient/' + id, options)
            .then(function (response) {

                dispatch({
                    type: GET_PATIENT_INFO_COMPLETE,
                    payload: response.data
                });

            })
            .catch(function (error) {
                console.log("FETCH PATIENT By ID FAILED")

                dispatch({
                    type: GET_PATIENT_INFO_FAILED
                });

            })
            .finally(function () {

            });
    }
}

export const AdoptPatient = (token: string, patientID: string, physicianID: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: ADOPT_PATIENT
        });

        axios.post(BE_URL + 'physician/adopt/' + patientID, null, options)
            .then(function (response) {

                dispatch({
                    type: ADOPT_PATIENT_COMPLETE,
                    payload: {
                        patientID,
                        physicianID
                    }
                });

            })
            .catch(function (error) {
                console.log("adopt PATIENT FAILED")

                dispatch({
                    type: ADOPT_PATIENT_FAILED
                });

            })
            .finally(function () {

            });
    }
}

export const DropPatient = (token: string, patientID: string, physicianID: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: DROP_PATIENT
        });

        axios.post(BE_URL + 'physician/drop/' + patientID, null, options)
            .then(function (response) {

                dispatch({
                    type: DROP_PATIENT_COMPLETE,
                    payload: {
                        patientID,
                        physicianID
                    }
                });

                console.log(response.data)

            })
            .catch(function (error) {
                console.log("drop PATIENT FAILED")

                dispatch({
                    type: DROP_PATIENT_FAILED
                });

            })
            .finally(function () {

            });
    }
}

export const GetPatientPatEvals = (token: string, patientID: string, setPatientPatEvals: Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    setPatientPatEvals("loading")

    axios.get(BE_URL + 'patientEval/patient/' + patientID, options)
        .then(function (response) {

            console.log(response.data)
            setPatientPatEvals(response.data)

        })
        .catch(function (error) {

            setPatientPatEvals("error")

        })
        .finally(function () {

        });
}



export const GetPatientHistory = (token: string, patientID: string, setPatientHistory: Function, setFetchStatus: Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    let compareHistory = (a: any, b: any) => {
        if (a.creationDate < b.creationDate)
            return 1
        if (a.creationDate > b.creationDate)
            return -1
        return 0
    }

    setFetchStatus("loading")

    axios.get(BE_URL + 'patient/history/' + patientID, options)
        .then(function (response) {

            setFetchStatus("complete")

            response.data.patientevals.forEach((element : any) => {
                element.type = "patEval"
            });
            response.data.physioevals.forEach((element : any) => {
                element.type = "physioEval"
            });
            response.data.exercises.forEach((element : any) => {
                element.type = "exercise"
            });


            let sortedHistory = [
                ...response.data.patientevals,
                ...response.data.physioevals,
                ...response.data.exercises
            ].sort(compareHistory)

            console.log(sortedHistory)

            setPatientHistory(sortedHistory)

        })
        .catch(function (error) {

            setFetchStatus("error")

        })
        .finally(function () {

        });
}