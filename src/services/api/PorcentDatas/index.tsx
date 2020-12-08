import axios from 'axios';
import { BASE_URL } from '../index';
import { UserLogin } from 'src/models';

export async function GetPorcentDatas(user: UserLogin){
    try {
        const objresponse = await axios.get(`${BASE_URL}orderstype/porcents/${user.idDocument}`, {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        })

        if(objresponse.status == 200){
            return objresponse.data
        }

        return {porcentcontribution: 0, porcentuserprofile: 0}
    } catch (error) {
        console.log(error)
    }
}