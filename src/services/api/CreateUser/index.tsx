import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { User } from '../../../models/User';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';

export async function CreateUser(user: User | null | undefined) {
    try {
        console.log('****dentro do create user')
        console.log(user)



        if (user != null || user != undefined) {

            const response = await axios.post(`${BASE_URL}user/adduser`,
                {
                    firstname: user.firstname!,
                    lastname: user.lastname!,
                    datebirth: user.datebirth!,
                    RG: user.RG!,
                    cpf_cnpj: user.cpf_cnpj!,
                    gender: user.gender!,
                    password: user.password!,
                    email: user.email!,
                    cellphone: user.cellphone!,
                    typeuser: user.typeuser!,
                    address: {
                        CEP: user.address?.CEP!,
                        city: user.address?.city!,
                        number: user.address?.number!,
                        neighbourhood: user.address?.neighbourhood!,
                        street: user.address?.street!,
                        state: user.address?.state!,
                        country: user.address?.country!
                    },
                    avatarsource: user.avatarsource ? user.avatarsource : {}
                })
            console.log('****retorno apos criar')
            console.log(response.data)
        }


    } catch (error) {
        console.log(error)
    }
}

export async function SetAvatarUser(avatarsource: ImagePickerResponse) {
    try {

        const bodyFormData = new FormData();
        bodyFormData.append('username', 'fred');

        // JSON.stringify({
        //     uri: avatarsource.uri,
        //     oriUri: avatarsource.origURL,
        //     type: avatarsource.type,
        //     name: avatarsource.fileName,
        //     originalname: avatarsource.fileName,
        //     timestamp: avatarsource.timestamp
        // })

        // bodyFormData.append('fileData', JSON.stringify({
        //     uri: avatarsource.uri,
        //     oriUri: avatarsource.origURL,
        //     type: avatarsource.type,
        //     name: avatarsource.fileName,
        //     originalname: avatarsource.fileName,
        //     timestamp: avatarsource.timestamp
        // }))

        bodyFormData.append('fileData', JSON.stringify({
            filename: avatarsource.fileName,
            size: avatarsource.fileSize,
            originalname: avatarsource.fileName,
            mimetype: avatarsource.type,
            path: 'teste'
        }))

        const response = await axios.post(`${BASE_URL}user/setAvatarUser`, bodyFormData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response.data);

    } catch (error) {
        console.log(error);
    }
}



// const avatar = {
        //     uri: avatarsource.uri,
        //     oriUri: avatarsource.origURL,
        //     type: avatarsource.type,
        //     name: avatarsource.fileName,
        //     timestamp: avatarsource.timestamp
        // }