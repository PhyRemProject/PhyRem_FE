import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"

import { PatientInterface } from '../User/components/Patients'

const BE_URL = "/api/"


export const createNewPatient = (token: string, patient: any, submitStatus: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.post(BE_URL + 'patient', patient, options)
        .then(function (response) {
            submitStatus("complete")
        })
        .catch(function (error) {
            submitStatus("error")
        })
        .finally(function () {

        });
}

export const createNewPhysician = (token: string, physician: any, submitStatus: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.post(BE_URL + 'physician', physician, options)
        .then(function (response) {
            submitStatus("complete")
        })
        .catch(function (error) {
            submitStatus("error")
        })
        .finally(function () {

        });
}



