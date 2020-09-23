import axios from 'axios';
import { BASE_URL } from '../';
import { UserLogin, ItemMapsLocationModels } from '../../../models'

export async function GetDataMaps(user: UserLogin) {
    try {

        let lstContribution: Array<ItemMapsLocationModels> = [];
        let lstAskContribution: Array<ItemMapsLocationModels> = [];
        let lstInfoHouseless: Array<ItemMapsLocationModels> = [];

        const response = await axios.get(`${BASE_URL}orderstype/getdatamaps`, {
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        if (response.data) {

            lstContribution = response.data.lstContribution;
            lstAskContribution = response.data.lstAskContribution;
            lstInfoHouseless = response.data.lstInfoHouseless;

        }

        console.log({ lstContribution, lstAskContribution, lstInfoHouseless })

        return {
            lstContribution,
            lstAskContribution,
            lstInfoHouseless
        }

    } catch (error) {
        console.log(error)
    }
}