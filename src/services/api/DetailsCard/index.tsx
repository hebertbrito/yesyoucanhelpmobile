import axios from 'axios';
import { UserLogin } from 'src/models';
import { BASE_URL } from '../'

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
        console.log(error)
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
        console.log(error)
    }
}