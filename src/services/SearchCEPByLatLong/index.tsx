import axios from 'axios';
import { return_URL_GEOCODING } from '../keys';
import { LocationModel } from '../../models/Location'

export function SearchCEPByLatLong(path: string) {
    const urlResponse = return_URL_GEOCODING(path);

    let response: any;

    axios.get(urlResponse).then(function (resolve) {
        if (resolve)
            response = resolve

        console.log('dentro do searchbylatlong')
        console.log(resolve)
    }).catch(function (reject) {
        response = reject.message
    })

    const { address_components } = response.data.results[0];

    const retorno = address_components.find((item => item.types[0] == 'postal_code'));

    const cep = parseFloat(retorno.long_name);

    return cep
}
