import React from 'react'
import { Alert } from 'react-native';

import translate from '../../services/translate/translate'

export function SwitchErros(value: number): void {
    switch (value) {
        case 401:
            // return { status: 401, name: "email_password_incorrect" }
            Alert.alert(`${translate("error")}`, `${translate("necessary_data_not_informed")}`)
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