import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"

import { PatientInterface } from '../User/components/Patients'

const BE_URL = process.env.REACT_APP_API_URL

export interface PatientEvalInterface {
    _id?: string,
    creationDate?: Date,
    patient: string,
    patientName?: string,
    patientEmail?: string,
    clinicDiagnosis: string,
    description: string,
    medicalPrescription: PrescriptionInterface[]
}


export interface PrescriptionInterface {
    prescription: string,
    prescriptionOption: string[],
    numOfTreatments: number,
    treatmentFreq: string
}

export const createNewPatEval = (token: string, patEval: PatientEvalInterface, submitStatus: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.post(BE_URL + 'patientEval', patEval, options)
        .then(function (response) {
            submitStatus("complete")
        })
        .catch(function (error) {
            submitStatus("error")
        })
        .finally(function () {

        });
}


export const getPhysicianPatEvals = (token: string, setFetchStatus: Function, setPatEvalList: Function) => {


    setFetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.get(BE_URL + 'patientEval/physician', options)
        .then(function (response) {
            setFetchStatus("complete")
            setPatEvalList(response.data)
        })
        .catch(function (error) {
            setFetchStatus("error")
        })
        .finally(function () {

        });
}


export const GetPatEval = (token: string, patientEval: string, setPatEvalInfo: Function, setFetchStatus: Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    setFetchStatus("loading")

    axios.get(BE_URL + 'patientEval/eval/' + patientEval, options)
        .then(function (response) {

            setFetchStatus("complete")
            setPatEvalInfo(response.data)

        })
        .catch(function (error) {

            setFetchStatus("error")

        })
        .finally(function () {

        });
}
