import axios from 'axios';
import { BASE_URL } from '../';
import { UserLogin, ItemMapsLocationModels, ItemMapsSpecificLocation } from '../../../models'
import { ValidationException } from '../../../helpers/errors/validation'

export async function GetDataMaps(user: UserLogin) {
    try {

        let lstAskContribution: Array<ItemMapsLocationModels> = [];
        let lstInfoHouseless: Array<ItemMapsLocationModels> = [];

        const response = await axios.get(`${BASE_URL}orderstype/getdatamaps/${user.idDocument}`, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        if (response.data) {

            lstAskContribution = response.data.lstAskContribution;
            lstInfoHouseless = response.data.lstInfoHouseless;

        }

        // console.log({ lstAskContribution, lstInfoHouseless })

        return {
            lstAskContribution,
            lstInfoHouseless
        }

    } catch (error) {
        console.log(error)
    }
}

export async function GetDatasMapsSpecificPoint(user: UserLogin, point: number) {
    try {

        let lstResponse: Array<ItemMapsSpecificLocation> = []

        const response = await axios.get(`${BASE_URL}orderstype/getdatamaps/${point}/${user.idDocument}`, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        if (response.data) {
            lstResponse = response.data
            return lstResponse
        }
        return []
    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}