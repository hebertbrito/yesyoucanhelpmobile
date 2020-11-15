import React from 'react'
import { Alert } from 'react-native';

import translate from '../../services/translate/translate'

interface ErrorSwitch {
    status: number,
    name: string
}

export function SwitchErros(value: number, setError: React.Dispatch<React.SetStateAction<boolean>>): void {
    switch (value) {
        case 401:
            // return { status: 401, name: "email_password_incorrect" }
            setError(true)
            Alert.alert(`${translate("error")}`, `${translate("email_password_incorrect")}`)
            break;
        case 404:
            // return { status: 404, name: "user_not_found" }
            setError(true)
            Alert.alert(`${translate("error")}`, `${translate("user_not_found")}`)
            break;
        case 500:
            // return { status: 500, name: "internal_server_error" }
            Alert.alert(`${translate("error")}`, `${translate("internal_server_error")}`)
            break;
        default:
            // return { status: 0, name: "undefined" }
            break;
    }
}