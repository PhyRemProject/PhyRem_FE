import React from 'react'
import axios from 'axios'
import jwt from 'jwt-decode'


import {
    USER_LOGIN,
    USER_LOGIN_COMPLETE,
    USER_LOGIN_FAILED
} from './UserReducer'

import Store from '../Global/Redux/Store';
import history from '../Global/Components/history'

const BE_URL = "/api/"

export const AttemptLogin = (email: string, password: string) => {

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

                dispatch({
                    type: USER_LOGIN_COMPLETE,
                    payload: decoded.user
                });

            })
            .catch(function (error) {
                dispatch({
                    type: USER_LOGIN_FAILED
                });

            })
            .finally(function () {


            });
    }
}


