import axios from 'axios';
import { UserLogin } from 'src/models';
import { BASE_URL } from '../'

export async function AcceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
    try {
        let dynamic_URL = ""

        if (typeorder == "3") {
            dynamic_URL = "infohouseless"
        } else if (typeorder == "2") {
            dynamic_URL = "askcontributions"
        }

        const data = {
            idDocumentOrder: idDocument,
            createdAt: Date.now(),
            idDocumentUserAccept: user?.idDocument!
        }

        const objResponse = await axios.put(`${BASE_URL}orderstype/acceptorders/${dynamic_URL}`, data, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })


    } catch (error: any) {
        console.log(error)
    }
}

export async function ReportOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
    try {
        let dynamic_URL = ""

        if (typeorder == "3") {
            dynamic_URL = "infohouseless"
        } else if (typeorder == "2") {
            dynamic_URL = "askcontributions"
        }

        const data = {
            idDocumentOrder: idDocument,
            createdAt: Date.now(),
            idDocumentUser: user?.idDocument!
        }

        const objResponse = await axios.put(`${BASE_URL}orderstype/ratingorders/${dynamic_URL}`, data, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

    } catch (error: any) {
        console.log(error)
    }
}