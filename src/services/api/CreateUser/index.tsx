import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../index';
import { User } from '../../../models/User';
import { switchState } from '../../switchresponse'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { ValidationException } from '../../../helpers/errors/validation'

export async function CreateUser(user: User) {
    try {
        console.log(user)
        const response = await axios.post(`${BASE_URL}user/addusers`, user)
        
        const data = switchState(response)
        return data
    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}

export async function SetAvatarUser(avatarsource: ImagePickerResponse) {
    try {
        // 'https://multer-teste.herokuapp.com/setAvatarUser'
        const response = await RNFetchBlob.fetch('POST', `${BASE_URL}user/setAvatarUser`, {
            'Content-Type': 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'avatar', filename: avatarsource.fileName, data: avatarsource.data }
        ])
        console.log(response.data)
    } catch (error) {
        console.log(error)
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}

