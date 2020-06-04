import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'


import {
    USER_LOGIN,
    USER_LOGIN_COMPLETE,
    USER_LOGIN_FAILED
} from './UserReducer'

import Store from '../Global/Redux/Store';
import history from '../Global/components/history'

const BE_URL = "/api/"

export const AttemptLogin = (email: string, password: string, setStatus: Function) => {

    return (dispatch: Function) => {
        
        dispatch({
            type: USER_LOGIN
        });

        axios.post(BE_URL + 'login', null, {
            params : {
                "email": email,
                "password": password,
                "role": "PHYSICIAN"
            }
        })
            .then(function (response) {

                let token = response.data.token;
                localStorage.setItem('token', token)
                let decoded: any = jwt(token);
                setStatus("success")
                console.log("login successful")

                dispatch({
                    type: USER_LOGIN_COMPLETE,
                    payload: decoded.user
                });

                history.push("/dashboard");

            })
            .catch(function (error) {
                console.log("login failed")
                if((error.message as string).indexOf("500") > 0)
                    setStatus("systemFail")
                else
                    setStatus("failed")
                
                dispatch({
                    type: USER_LOGIN_FAILED
                });

            })
            .finally(function () {


            });
    }
}


