import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"

import { PatientInterface } from '../User/components/Patients'
import { PhysioEvalInterface, CLEAR_PHYSIO_EXAM } from './PhysioEvalsReducer'

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

export const clearPhysioExam = () => {
    return (dispatch: Function) => {
        dispatch({
            type: CLEAR_PHYSIO_EXAM
        })
    }
}

export const submitNewPhysioEval = (token: string, physioEval: PhysioEvalInterface, submitStatus: Function) => {


    return (dispatch: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }


    axios.post(BE_URL + 'physioEval', physioEval, options)
        .then(function (response) {
            submitStatus("complete")
            dispatch({
                type: CLEAR_PHYSIO_EXAM
            })
        })
        .catch(function (error) {
            submitStatus("error")
        })
        .finally(function () {

        });
    }
}

export const GetPhysioEval = (token: string, physioEval: string, setPhysioEvalInfo: Function, setFetchStatus: Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    setFetchStatus("loading")


    axios.get(BE_URL + 'physioEval/eval/' + physioEval, options)
        .then(function (response) {

            setFetchStatus("complete")
            setPhysioEvalInfo(response.data)

        })
        .catch(function (error) {

            setFetchStatus("error")

        })
        .finally(function () {

        });
}
