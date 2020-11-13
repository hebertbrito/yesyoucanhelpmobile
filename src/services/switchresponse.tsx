import { AxiosResponse } from 'axios'
import translate from './translate/translate'
export const switchState = (data: AxiosResponse) => {
    switch (data.status) {
        case 200:
            if (data.data) {
                return data.data
            }
            return null
            break;
        case 201:
            if (data.data) {
                return data.data
            }
            return null
            break;
        case 204:
            if (data.data) {
                return data.data
            }
            return null
            break;
        case 401:
            if (data.data) {
                return data.data
            }
            return null
            break;
        case 404:
            if (data.data) {
                return data.data
            }
            return null
            break;
        case 406:

            break;
        case 500:
            if (data.data) {
                return data.data
            }
            return null
            break;
        default:

            break;
    }
}