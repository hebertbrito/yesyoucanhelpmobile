import axios from 'axios';
import { UserLogin } from 'src/models';
import { BASE_URL } from '../'
import { ValidationException } from '../../../helpers/errors/validation'
export async function GetDetailsCardAskConstributions(idDocument: string, user: UserLogin | undefined) {
    try {

        const objResponse = await axios.get(`${BASE_URL}orderstype/getdetailsaskcontribution/${idDocument}`, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        if (objResponse.status == 200) {
            return objResponse.data
        }

        return null

    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}

export async function GetDetailsCardInfoHouseless(idDocument: string, user: UserLogin | undefined) {
    try {

        const objResponse = await axios.get(`${BASE_URL}orderstype/getdetailsinfohouseless/${idDocument}`, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        if (objResponse.status == 200) {
            return objResponse.data
        }

        return null

    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}