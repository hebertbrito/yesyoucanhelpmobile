import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from '../../../models/UserLogin'



export const GetLoginUser = async function (email: string, password: string) {
    try {
        const objUserLogin: UserLogin = {}

        const response = await axios.post(BASE_URL + 'auth/login',
            {
                email: email,
                password: password
            });

        if (response.status === 200) {

            if (response.data != null) {

                const { idDocument, firstname, lastname, token } = response.data.data;

                objUserLogin.firstname = firstname
                objUserLogin.idDocument = idDocument
                objUserLogin.lastname = lastname
                objUserLogin.token = token
                objUserLogin.message = response.data.message

                return objUserLogin;
            }

        } else {

            return objUserLogin.message = response.data.message

        }

    } catch (error) {
        console.log(error)
    }
}