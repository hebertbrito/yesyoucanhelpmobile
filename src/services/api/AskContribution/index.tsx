import axios from 'axios';
import { BASE_URL } from '../'
import { User } from '../../../models/User'
import { AskContributionModel } from '../../../models/AskContributionModel'
export async function AskContribution(user: User | undefined, dataRequest: AskContributionModel) {
    try {
        console.log('****dentro da função para api');
        console.log(dataRequest.products);
        const response = await axios.post(`${BASE_URL}orderstype/askcontribution`,
            {
                idDocument: dataRequest.idDocument,
                cep: dataRequest.CEP,
                lat: dataRequest.lat,
                long: dataRequest.long,
                products: dataRequest.products
            },
            {
                headers: {
                    Authorization: `Bearer ${user!.token!}`
                }
            })

        return response.data

    } catch (error) {
        console.log(error)
    }
}