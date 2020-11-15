import axios from 'axios';
import { BASE_URL } from '../';
import { UserLogin } from '../../../models';
import { MakeContributionModel } from '../../../models/MakeContribution';
import { GetDate } from '../../../mocks/getdate';
import { ValidationException } from '../../../helpers/errors/validation'

export async function MakeContribution(user: UserLogin, dataRequest: MakeContributionModel) {
    try {
        console.log(dataRequest)
        if (dataRequest) {

            const date = GetDate();
            const response = await axios.post(`${BASE_URL}orderstype/makecontributions`,
                {
                    idDocumentUser: dataRequest.idDocument,
                    cep: dataRequest.cep!,
                    createdAt: Date.now(),
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
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}