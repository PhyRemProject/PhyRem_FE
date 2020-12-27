import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'
import FileDownload from  "js-file-download"

const BE_URL = process.env.REACT_APP_API_URL


export const downloadExercise = (token: string, exerciseID: string, setStatus: Function, setPositions: Function) => {
    
    let options = {
        headers: { "Authorization": "Bearer " + token }
    }

    axios.get(BE_URL + "exercises?exerciseID=" + exerciseID, options)
    .then((response) => {
        console.log(response.data)
        setPositions(response.data)
    });

}




