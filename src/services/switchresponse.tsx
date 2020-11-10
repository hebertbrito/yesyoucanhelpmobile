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

            break;
        case 401:

            break;
        case 404:

            break;
        case 406:

            break;
        case 500:

            break;
        default:
            break;
    }
}