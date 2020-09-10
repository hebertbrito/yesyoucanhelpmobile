import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from 'src/models/UserLogin';
import { User } from 'src/models/User';

export async function GetUserProfile(user: UserLogin | undefined) {
    try {

        // console.log(user);
        let objUser: User = {};

        const response = await axios.get(`${BASE_URL}user/getuser/${user!.idDocument!}`,
            {
                headers: {
                    Authorization: `Bearer ${user!.token!}`
                }
            });

        if (response.status === 200 && response.data.data != null) {
            objUser = response.data.data;

            return objUser
        } else {
            const message = response.data.message;

            return message
        }

    } catch (error) {
        console.log(error);
    }
}







// export function GetUserProfile(user: UserLogin | undefined) {

//     let objUser: User = {};

//     const hehe = axios.get(`${BASE_URL}user/getuser/${user!.idDocument!}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${user!.token!}`
//             }
//         }).then(function (response) {
//             // return response

//             objUser = response.data.data
//             return objUser

//         }).catch(function (reject) {
//             console.log(reject)
//         });

//     return hehe;


// }