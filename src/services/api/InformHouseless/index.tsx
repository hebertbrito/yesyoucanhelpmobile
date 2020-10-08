import { DarkTheme } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../'
import { GetDate } from '../../../mocks/getdate';
import { HouseLessModel, UserLogin } from '../../../models'

export async function SendInformHouseless(data: HouseLessModel | undefined, user: UserLogin | undefined) {
    try {
        const DATE = GetDate();

        // const { photo } = data;

        // const bodyData = new FormData();
        // bodyData.append('idDocument', data.idDocument!);
        // bodyData.append('lat', data.lat!);
        // bodyData.append('long', data.long!);
        // bodyData.append('cep', data.CEP!);
        // bodyData.append('createdAt', DATE);
        // bodyData.append('name', data.name!);
        // bodyData.append('description', data.description!);
        // bodyData.append('imagehouseless', JSON.stringify({
        //     type: photo?.type!,
        //     filename: photo!.fileName!,
        //     name: photo!.fileName!,
        //     uri: photo!.uri,
        //     oriUri: photo?.origURL,
        //     timestamp: photo!.timestamp!
        // }))

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

            console.log(response.data)
        }


    } catch (error) {
        console.log(error)
    }
}
