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

export function SwitchErros(
    value: number,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setColorBackground: React.Dispatch<React.SetStateAction<string>>,
    setTextColor: React.Dispatch<React.SetStateAction<string>>,
    setSubcolorButton: React.Dispatch<React.SetStateAction<string>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    paperTheme: any
): void {
    switch (value) {
        case 201:
            setTitle("completed")
            setText("completed_order_message")
            setColorBackground(paperTheme.colors.onSurface)
            setTextColor("#212121")
            setSubcolorButton("#212121")
            break;
        case 204:
            setTitle("error")
            setText("necessary_data_not_informed")
            setColorBackground(paperTheme.colors.third)
            setTextColor("#212121")
            setSubcolorButton("#212121")
            break;
        case 401:
            setTitle("error")
            setText("necessary_data_not_informed")
            setColorBackground(paperTheme.colors.notification)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        case 500:
            setText("internal_server_error")
            setColorBackground(paperTheme.colors.error)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        default:
            setText("internal_server_error")
            setColorBackground(paperTheme.colors.error)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
    }
}