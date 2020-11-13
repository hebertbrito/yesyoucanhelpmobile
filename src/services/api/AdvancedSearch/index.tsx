import axios from 'axios';
import { BASE_URL } from '../';
import { UserLogin, AdvancedSearch, AdvancedSearchResponse } from '../../../models';

export async function GetAdvancedSearch(datas: AdvancedSearch, user: UserLogin) {
    try {
        const response = await axios.get(`${BASE_URL}useradvanced/advanced/searches`, {
            params: {
                ...datas
            },
            headers: {
                Authorization: `Bearer ${user!.token!}`
            }
        })

        console.log(response.data)
        if (response.data) {
            let lstDatas: Array<AdvancedSearchResponse> = [];

            response.data.map(item => {
                lstDatas.push(item)
            })
            
            return lstDatas
        }
        return []
    } catch (error) {
        const regex = new RegExp(/\d+/)
        let teste = regex.exec(error.toString())
        console.log(teste)

    }
}