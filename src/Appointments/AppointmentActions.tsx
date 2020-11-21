import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash from "lodash"


import {
    GET_TODAYS_APPOINTMENTS,
    GET_TODAYS_APPOINTMENTS_COMPLETE,
    GET_TODAYS_APPOINTMENTS_FAILED,
    GET_APPOINTMENTS_BETWEEN,
    GET_APPOINTMENTS_BETWEEN_COMPLETE,
    GET_APPOINTMENTS_BETWEEN_FAILED,
    AppointmentInterface,
    ACCEPT_APPOINTMENT,
    ACCEPT_APPOINTMENT_COMPLETE,
    ACCEPT_APPOINTMENT_FAILED,
    CREATE_APPOINT,
    CREATE_APPOINT_COMPLETE,
    CREATE_APPOINT_FAILED,
    REJECT_APPOINTMENT,
    REJECT_APPOINTMENT_COMPLETE,
    REJECT_APPOINTMENT_FAILED
} from './AppointmentReducer'

import Store from '../Global/Redux/Store';
import history from '../Global/components/history'
import { PatientInterface } from '../User/components/Patients'
import { PatientEvalInterface } from '../PatientEvals/PatientEvalsActions'

const BE_URL = "http://phyrem.pt/api/"

export const getTodaysAppoints = (token: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: GET_TODAYS_APPOINTMENTS
        });

        axios.get(BE_URL + 'appointment/today', options)
            .then(function (response) {

                dispatch({
                    type: GET_TODAYS_APPOINTMENTS_COMPLETE,
                    payload: response.data
                });

            })
            .catch(function (error) {
                console.log("FETCH TODAYS APPOINTS FAILED")

                dispatch({
                    type: GET_TODAYS_APPOINTMENTS_FAILED
                });

            })
            .finally(function () {

            });
    }
}

export const getAppointsBetween = (startDate: Date, endDate: Date, token: string) => {

    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token },
            params: {
                "startDate": startDate,
                "endDate": endDate
            }
        }

        dispatch({
            type: GET_APPOINTMENTS_BETWEEN
        });

        axios.get(BE_URL + 'appointment/between', options)
            .then(response => {

                dispatch({
                    type: GET_APPOINTMENTS_BETWEEN_COMPLETE,
                    payload: {
                        appointments: response.data,
                        interval: [startDate, endDate]
                    }
                });

            })
            .catch(error => {
                console.log("GET BETWEEN FAILED")

                dispatch({
                    type: GET_APPOINTMENTS_BETWEEN_FAILED
                });

            })
            .finally(() => {

            });
    }
}

export const acceptAppoint = (appointment: AppointmentInterface, token: string) => {
    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: ACCEPT_APPOINTMENT
        });

        axios.post(BE_URL + 'appointment/' + appointment._id + '/accept', null, options)
            .then(response => {

                dispatch({
                    type: ACCEPT_APPOINTMENT_COMPLETE,
                    payload: appointment
                });

            })
            .catch(error => {

                dispatch({
                    type: ACCEPT_APPOINTMENT_FAILED
                });

            })
            .finally(() => {

            });
    }

}

export const rejectAppoint = (appointment: AppointmentInterface, token: string) => {
    return (dispatch: Function) => {

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: REJECT_APPOINTMENT
        });

        axios.post(BE_URL + 'appointment/' + appointment._id + '/reject', null, options)
            .then(response => {

                dispatch({
                    type: REJECT_APPOINTMENT_COMPLETE,
                    payload: appointment
                });

            })
            .catch(error => {

                dispatch({
                    type: REJECT_APPOINTMENT_FAILED
                });

            })
            .finally(() => {

            });
    }

}


export const createAppoint = (
    setStatus: Function,
    startDate: Date,
    endDate: Date,
    location: string,
    patient: PatientInterface,
    objective: string,
    // diagnostic : string,
    // treatment : string,
    summary: string,
    patEval: PatientEvalInterface | null,
    token: string
) => {
    return (dispatch: Function) => {

        /** Validation checks**/
        if(patient === null) {
            setStatus("Nenhum paciente seleccionado")
            return
        }

        let options = {
            headers: { "Authorization": "Bearer " + token }
        }

        dispatch({
            type: CREATE_APPOINT
        });


        let newAppointment : any = {
            startDate,
            endDate,
            location,
            patient: patient._id,
            summary,
            objective
        }

        if(patEval !== null)
            newAppointment.patientEval = patEval._id

        console.log("Submitting appointment: ", newAppointment)

        axios.post(BE_URL + 'appointment', newAppointment , options)
            .then(response => {

                console.log(response.data)
                delete response.data.physicianInfo;
                console.log(response.data)

                dispatch({
                    type: CREATE_APPOINT_COMPLETE,
                    payload: response.data
                });

            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: CREATE_APPOINT_FAILED
                });

            })
            .finally(() => {

            });
    }

}

export const GetAppointPatEval = (token : string, patientEval : string, setPatEvalInfo : Function) => {

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    //setPatEvalInfo("loading")

    axios.get(BE_URL + 'patientEval/eval/' + patientEval, options)
    .then(function (response) {

        console.log(response.data)
        setPatEvalInfo(response.data)

    })
    .catch(function (error) {

        //setPatEvalInfo("error")

    })
    .finally(function () {

    });
}
