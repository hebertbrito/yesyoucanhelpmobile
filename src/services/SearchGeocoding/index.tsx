import React from 'react';
import axios from 'axios'
import { return_URL_GEOCODING } from '../keys'

export async function SearchGeocoding(pathAddress: string) {
    try {
        const urlResponse = return_URL_GEOCODING(pathAddress);
        // console.log(urlResponse);
        const response = await axios.get(urlResponse);
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}