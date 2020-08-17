import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"

import { PatientInterface } from '../User/components/Patients'
import { PhysioEvalInterface } from './PhysioEvalsReducer'

const BE_URL = "/api/"

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

export const submitNewPhysioEval = (token: string, physioEval: PhysioEvalInterface, submitStatus: Function) => {

    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }


    //TODO NEEDS UPDATING
    axios.post(BE_URL + 'physioEval', physioEval, options)
        .then(function (response) {
            submitStatus("complete")
        })
        .catch(function (error) {
            submitStatus("error")
        })
        .finally(function () {

        });
}


export const getPhysicianPhysioEvals = (token: string, setFetchStatus: Function, setPatEvalList: Function) => {


    setFetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    //TODO NEEDS UPDATING
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


export const GetPhysioEval = (token: string, patientEval: string, setPatEvalInfo: Function, setFetchStatus: Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    setFetchStatus("loading")


    //TODO NEEDS UPDATING
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
