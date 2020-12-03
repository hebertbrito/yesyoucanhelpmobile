import axios from 'axios';
import { UserLogin } from 'src/models';
import { BASE_URL } from '../'
import { ValidationException } from '../../../helpers/errors/validation'

export async function AcceptOrders(idDocument: string, user: UserLogin | undefined, typeorder: string) {
    try {
        
        const data = {
            idDocumentOrder: idDocument,
            createdAt: Date.now(),
            idDocumentUserAccept: user?.idDocument!
        }

        await axios.put(`${BASE_URL}orderstype/acceptorders/askcontributions`, data, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })


    } catch (error) {
        const value = ValidationException(error);
        return Promise.reject(value)
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

        await axios.put(`${BASE_URL}orderstype/ratingorders/${dynamic_URL}`, data, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

    } catch (error) {
        const value = ValidationException(error);
        return Promise.reject(value)
    }
}

export async function AcceptOrdersContributions(idDocument: string, user: UserLogin) {
    try {
        
        const data = {
            idDocumentOrder: idDocument,
            createdAt: Date.now(),
            idDocumentUserAccept: user.idDocument
        }
        console.log(data)
        console.log(user)
        await axios.put(`${BASE_URL}orderstype/acceptorders/contributions`, data, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })


    } catch (error) {
        const value = ValidationException(error);
        return Promise.reject(value)
    }
}

export async function ReportOrdersContributions(idDocument: string, user: UserLogin) {
    try {
        const data = {
            idDocumentOrder: idDocument,
            createdAt: Date.now(),
            idDocumentUser: user.idDocument
        }

        await axios.put(`${BASE_URL}orderstype/ratingorders/contributions`, data, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

    } catch (error) {
        const value = ValidationException(error);
        return Promise.reject(value)
    }
}