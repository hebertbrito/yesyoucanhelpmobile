import React from 'react'
import axios from 'axios'
import { LocationModel } from '../../models/Location'
import { return_URL_GEOCODING } from '../keys'

export async function SearchGeocoding(pathAddress: string) {
    try {

        const urlResponse = return_URL_GEOCODING(pathAddress);
        // console.log(urlResponse);
        const response = await axios.get(urlResponse);
        // console.log(response.data.results[0].geometry.location)

        if (response) {
            if (response.data.status != 'OK') {
                const objLocation: LocationModel = { lat: 0, long: 0, message: 'Not find or Denied request' }
                return objLocation
            }


            const { lat, lng } = response.data.results[0].geometry.location;
            const objLocation: LocationModel = {
                lat: lat,
                long: lng,
                message: 'Complete'
            }

            return objLocation;
        }
    } catch (error) {
        const objLocation: LocationModel = { lat: 0, long: 0, message: error.message }
        return objLocation;
    }
}