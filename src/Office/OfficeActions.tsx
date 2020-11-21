import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import lodash, { reject } from "lodash"

import { PatientInterface } from '../User/components/Patients'

export interface PhysicianInterface {
    _id: string,
    creationDate?: number,
    name: string,
    email: string,
    phoneNumber: string,
    specialty: string[],
    physicianID: string,
}


const BE_URL = "http://phyrem.pt/api/"


const uploadImage = (token: string, selectedFile: string, userID: string, userType: string) => {
    const formData = new FormData();
    formData.append('file', selectedFile as string)
    if (userType === "PATIENT")
        formData.append('patientID', userID)
    else if (userType === "PHYSICIAN")
        formData.append('physicianID', userID)
    console.log(formData)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
        }
    }

    if (userType === "PATIENT")
        return axios.post(BE_URL + "patient/profileImage", formData, config)
    else if (userType === "PHYSICIAN")
        return axios.post(BE_URL + "physician/profileImage", formData, config)

}

export const createNewPatient = (token: string, patient: any, patientImage: string | undefined, submitStatus: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.post(BE_URL + 'patient', patient, options)
        .then(function (response) {
            submitStatus("complete")
            console.log(response.data)
            if (patientImage !== undefined)
                uploadImage(token, patientImage, response.data.id, "PATIENT")
        })
        .catch(function (error) {
            submitStatus("error - " + JSON.stringify(error.response.data))
        })
        .finally(function () {

        });
}

export const createNewPhysician = (token: string, physician: any, physicianImage: string | undefined, submitStatus: Function) => {


    submitStatus("uploading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.post(BE_URL + 'physician', physician, options)
        .then(function (response) {
            submitStatus("complete")
            if (physicianImage !== undefined)
                uploadImage(token, physicianImage, response.data.id, "PHYSICIAN")
        })
        .catch(function (error) {
            submitStatus("error - " + JSON.stringify(error.response.data))
        })
        .finally(function () {

        });
}



export const getAllPatients = (token: string, searchDate: number, fetchStatus: Function) => {


    fetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }


    return new Promise((resolve, reject) => {
        axios.get(BE_URL + 'patient/all/' + searchDate, options)
            .then(function (response) {
                fetchStatus("complete")
                resolve(response.data as PatientInterface[])
            })
            .catch(function (error) {
                fetchStatus("error")
                reject()
            })
            .finally(function () {

            });

    })
}


export const getAllPhysicians = (token: string, searchDate: number, fetchStatus: Function) => {


    fetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token }
    }


    return new Promise((resolve, reject) => {
        axios.get(BE_URL + 'physician/all/' + searchDate, options)
            .then(function (response) {
                fetchStatus("complete")
                resolve(response.data)
            })
            .catch(function (error) {
                fetchStatus("error")
                reject()
            })
            .finally(function () {

            });

    })
}

export const getPatientsWithName = (token: string, name: string, fetchStatus: Function) => {

    fetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token },
        params: {
            name
        }
    }

    return new Promise((resolve, reject) => {
        axios.get(BE_URL + 'patient/search', options)
            .then(function (response) {
                fetchStatus("complete")
                resolve(response.data as PatientInterface[])
            })
            .catch(function (error) {
                fetchStatus("error")
                reject()
            })
            .finally(function () {

            });

    })
}

export const getPhysiciansWithName = (token: string, name: string, fetchStatus: Function) => {

    fetchStatus("loading")

    let options = {
        headers: { "Authorization": "Bearer " + token },
        params: {
            name
        }
    }

    return new Promise((resolve, reject) => {
        axios.get(BE_URL + 'physician/search', options)
            .then(function (response) {
                fetchStatus("complete")
                resolve(response.data as PatientInterface[])
            })
            .catch(function (error) {
                fetchStatus("error")
                reject()
            })
            .finally(function () {

            });

    })
}

