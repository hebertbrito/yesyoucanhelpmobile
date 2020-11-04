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

            const response = await axios.post(`${BASE_URL}user/addusers`,
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

        let payload = new FormData();
        const avatar = {
            name: avatarsource.fileName,
            type: "image/png",
            path: avatarsource.path
        }
        const originalname = avatarsource.fileName
        payload.append('name', 'name')
        payload.append('avatar', JSON.stringify({ type: "image/png", name: avatarsource.fileName, path: avatarsource.path }))
        // payload.append('size', avatarsource.fileSize)
        // payload.append('uri', avatarsource.uri)

        const respose = await axios.post('https://multer-teste.herokuapp.com/setAvatarUser',
        payload,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
        )


        console.log(respose.data)

    } catch (error) {
        console.log(error);
    }
}

