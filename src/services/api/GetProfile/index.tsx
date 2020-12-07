import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { User, UserLogin } from 'src/models';

export async function GetUserProfile(user: UserLogin | undefined, setUserModel: React.Dispatch<React.SetStateAction<User | undefined>>) {
    try {

        // console.log(user);


        const response = await axios.get(`${BASE_URL}user/getuser/${user!.idDocument!}`,
            {
                headers: {
                    Authorization: `Bearer ${user!.token!}`
                }
            });

        if (response.status === 200 && response.data.data != null) {

            const {

                RG,
                address,
                avatarsource,
                cellphone,
                cpf_cnpj,
                datebirth,
                email,
                firstname,
                gender,
                lastname,
                password,
                typeuser

            } = response.data.data;

            const objUser: User = {

                RG,
                address,
                avatarsource,
                cellphone,
                cpf_cnpj,
                datebirth,
                email,
                firstname,
                gender,
                lastname,
                password,
                typeuser
            }

            setUserModel(objUser);

            return objUser;
        } else {
            const objUser: User = {}
            return objUser;
        }

    } catch (error) {
        console.log(error);
    }
}


export async function GetUserTORefresh(user: UserLogin) {
    try {

        // console.log(user);


        const response = await axios.get(`${BASE_URL}user/getuser/refresh/${user.idDocument}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

        if (response.data) {
            return response.data;
        }

        return null;

    } catch (error) {
        console.log(error);
    }
}
