import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios';
import { BASE_URL } from '../';
import { HouseLessModel, UserLogin } from '../../../models';
import { ValidationException } from '../../../helpers/errors/validation'

//servies
import { AddImageHouseless } from '../StaticFiles'

export async function SendInformHouseless(data: HouseLessModel | undefined, user: UserLogin | undefined) {
    try {
        console.log("cai aqui")
        if (data) {
            const datas = {
                idDocumentUser: data.idDocument!,
                lat: data!.lat!,
                long: data!.long!,
                cep: data!.CEP!,
                createdAt: Date.now(),
                name: data!.name!,
                description: data!.description!
            }

            const response = await axios.post(`${BASE_URL}orderstype/informhouseless`, datas, {
                headers: {
                    Authorization: `Bearer ${user!.token!}`
                }
            })

            if (response.data && data.photo) {
                await AddImageHouseless(data.photo, response.data)
            }
        }


    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}