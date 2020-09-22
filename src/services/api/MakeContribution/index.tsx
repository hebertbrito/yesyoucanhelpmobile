import axios from 'axios';
import { BASE_URL } from '../';
import { User } from '../../../models/User';
import { MakeContributionModel } from '../../../models/MakeContribution';
import { GetDate } from '../../../mocks/getdate';

export async function MakeContribution(user: User | undefined, dataRequest: MakeContributionModel) {
    try {
        console.log(dataRequest)
        if (dataRequest) {

            const date = GetDate();
            const response = await axios.post(`${BASE_URL}orderstype/makecontribution`,
                {
                    idDocumentUser: dataRequest.idDocument,
                    cep: dataRequest.cep!,
                    createdAt: date,
                    lat: dataRequest!.lat,
                    long: dataRequest!.long,
                    products: dataRequest!.products
                },
                {
                    headers: {
                        Authorization: `Bearer ${user!.token!}`
                    }
                })

            console.log(response.data)

        }

    } catch (error) {
        console.log(error)
    }
}