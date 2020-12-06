import axios from 'axios';
import { BASE_URL } from '../index';
import { ValidationException } from '../../../helpers/errors/validation'

interface Data {
    newpassword: string,
    email: string,
    cpf_cnpj: string
}

export async function RecoverPassword(data: Data) {
    try {
        // await axios.post(`${BASE_URL}user/forgotpassword`, data)
        await axios.post(`${BASE_URL}user/forgotpassword`, data)
    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}