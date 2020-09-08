import React, { useState } from 'react';
import axios from 'axios';
import { CEPjson } from '../../models/CEPjson'

export async function SearchCEP(CEP: string) {
    try {

        let objCEP: CEPjson = {}
        const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json`);

        if (response) {
            objCEP = response.data
        }

        return objCEP
    } catch (error) {
        console.log(error)
    }
}