import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from '../../../models/UserLogin'
import { switchState } from '../../switchresponse'
import { ValidationException } from '../../../helpers/errors/validation'

export const GetLoginUser = async function (email: string, password: string) {
    try {
        let objUserLogin: UserLogin = {}

        const response = await axios.post(BASE_URL + 'auth/login',
            {
                email: email,
                password: password
            });

        objUserLogin = switchState(response)
        return objUserLogin
    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}