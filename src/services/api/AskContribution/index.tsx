import axios from 'axios';
import { BASE_URL } from '../';
import { User } from '../../../models/User';
import { AskContributionModel } from '../../../models/AskContributionModel';
import { GetDate } from '../../../mocks/getdate'
export async function AskContribution(user: User | undefined, dataRequest: AskContributionModel) {
    try {



        if (dataRequest) {

            const date = GetDate();
            const response = await axios.post(`${BASE_URL}orderstype/askcontributions`,
                {
                    idDocumentUser: dataRequest.idDocument,
                    createdAt: Date.now(),
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
        }

    } catch (error) {
        console.log(error)
    }
}