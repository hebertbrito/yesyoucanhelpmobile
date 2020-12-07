import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin, Contribution, Houseless, AskContribution } from '../../../models';
import { ValidationException } from '../../../helpers/errors/validation'

interface UpdatePassword {
    password: string,
    newpassword: string,
    idDocument: string,
    token: string
}

export async function UpdatePassword(data: UpdatePassword) {
    try {

        await axios.put(`${BASE_URL}user/update/password/user`, data, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })

    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}