import axios from 'axios'
import { BASE_URL } from '../index'
import { UserLogin, Contribution, Houseless, AskContribution } from '../../../models'
import { ValidationException } from '../../../helpers/errors/validation'


export const GetStatusItemsByUser = async function (user: UserLogin) {
    try {
        let lstContributions: Array<Contribution> = []
        let lstAksContributions: Array<AskContribution> = []
        let lstHouseless: Array<Houseless> = []

        const response = await axios.get(`${BASE_URL}orderstype/getstatusitens/${user.idDocument}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        if(response.data){
            lstContributions = response.data.lstContributions;
            lstAksContributions = response.data.lstAksContributions;
            lstHouseless = response.data.lstHouseless;

        }
        
        return {
            lstContributions,
            lstAksContributions,
            lstHouseless
        }

    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}