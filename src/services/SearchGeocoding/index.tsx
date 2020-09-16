import React from 'react'
import axios from 'axios'
import { LocationModel } from '../../models/Location'
import { return_URL_GEOCODING } from '../keys'

export async function SearchGeocoding(pathAddress: string, setMessageError: React.Dispatch<React.SetStateAction<string>>, CEP: string) {
    try {

        const urlResponse = return_URL_GEOCODING(pathAddress);

        const response = await axios.get(urlResponse);

        if (response) {
            if (response.data.status != 'OK') {
                setMessageError('Not find or Denied request')
            } else {

                const { address_components, geometry: { location } } = response.data.results[0]

                // const { lat, lng } = response.data.results[0].geometry.location;
                console.log(`lat: ${location.lat} long: ${location.lng}`)

                const retorno = address_components.find((item: { types: string[]; }) => item.types[0] == 'postal_code');

                const cep = retorno.long_name;

                const objRetorno = { lat: location.lat, long: location.lng, message: 'Complete', cep: CEP != undefined && CEP != '' ? CEP : cep };

                return objRetorno;
            }
        }
    } catch (error) {
        setMessageError(error.message)
    }
}