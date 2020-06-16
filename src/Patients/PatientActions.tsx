import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"
import { GET_PHYSICIANS_PATIENTS, GET_PHYSICIANS_PATIENTS_COMPLETE, GET_PHYSICIANS_PATIENTS_FAILED } from './PatientReducer'


const BE_URL = "/api/"

export const GetAdoptedPatientList = (token : string) => {

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
