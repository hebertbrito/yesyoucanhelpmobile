import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from '../../../models/UserLogin'
import { switchState } from '../../switchresponse'


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
        console.log(error)
    }
}