import axios from 'axios';
import { BASE_URL } from '../'
import { User } from '../../../models/User'
import { MakeContributionModel } from '../../../models/MakeContribution'

export async function MakeContribution(user: User | undefined, dataRequest: MakeContributionModel) {
    try {
        console.log('****dentro da função para api');
        console.log(dataRequest.products);
        const response = await axios.post(`${BASE_URL}orderstype/makecontribution`,
            {
                idDocument: dataRequest.idDocument,
                lat: dataRequest.lat,
                long: dataRequest.long,
                products: dataRequest.products
            },
            {
                headers: {
                    Authorization: `Bearer ${user!.token!}`
                }
            })

        console.log(response)

    } catch (error) {
        console.log(error)
    }
}