import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from '../../../models/UserLogin'



export const GetLoginUser = async function () {
    try {
        const objUserLogin: UserLogin = {}
        const response = await axios.post(BASE_URL + 'auth/login',
            {
                email: 'hebertfelipe.97@outlook.com.br',
                password: '1234567893'
            });

        if (response.data != null) {

            const { idDocument, firstname, lastname, _token } = response.data.data;

            objUserLogin.firstname = firstname
            objUserLogin.idDocument = idDocument
            objUserLogin.lastname = lastname
            objUserLogin.token = _token

        }

        return objUserLogin;

    } catch (error) {
        console.log(error)
    }
}