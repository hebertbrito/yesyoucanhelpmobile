import React from 'react';
import { User } from "src/models";

const lstValidationPerson = ['firstname', 'lastname', 'datebirth', 'gender',
    'email', 'password', 'cellphone', 'cpf_cnpj', 'RG', 'gender']
const lstValidationLegal = ['firstname', 'lastname', 'email', 'password', 'cellphone', 'cpf_cnpj']
const lstAddressValidationPerson = ['country', 'city', 'street', 'number', 'state', 'CEP', 'neighbourhood']

export function validateCreateUser(data: User): boolean {
    let response = true

    if (data.typeuser == "1") {
        for (const item of lstValidationPerson ) {
            if (!data[item] || data[item] == "" || data[item] == undefined) {
                response = false
                break;
            }
        }   

        for (const iterator of lstAddressValidationPerson) {
            if (!data.address[iterator] || data.address[iterator] == "" || data.address[iterator] == undefined) {
                response = false
                break;
            }
        }
    } else {

        for (const item of lstValidationLegal) {
            if (!data[item] || data[item] == "" || data[item] == undefined) {
                response = false
                break;
            }
        }

        for (const iterator of lstAddressValidationPerson) {
            if (!data.address[iterator] || data.address[iterator] == "" || data.address[iterator] == undefined) {
                response = false
                break;
            }
        }

    }
    return response
}

export function validateAddress(data: User) {
    for (const iterator of lstAddressValidationPerson) {
        if (data.address[iterator] && data.address[iterator] == "") {validateAddress
            response = false
            break;
        }
    }
}