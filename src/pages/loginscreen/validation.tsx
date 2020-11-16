import React from 'react'
import { Alert } from 'react-native';
import { useTheme } from 'react-native-paper';

import translate from '../../services/translate/translate'

interface ErrorSwitch {
    status: number,
    name: string
}

export function SwitchErros(
    value: number,
    setError: React.Dispatch<React.SetStateAction<boolean>>,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setColorBackground: React.Dispatch<React.SetStateAction<string>>,
    setTextColor: React.Dispatch<React.SetStateAction<string>>,
    setSubcolorButton: React.Dispatch<React.SetStateAction<string>>,
    paperTheme: any
): void {

    switch (value) {
        case 401:
            // return { status: 401, name: "email_password_incorrect" }
            setError(true)
            // Alert.alert(`${translate("error")}`, `${translate("email_password_incorrect")}`)
            setText("email_password_incorrect")
            setColorBackground(paperTheme.colors.notification)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        case 404:
            // return { status: 404, name: "user_not_found" }
            setError(true)
            // Alert.alert(`${translate("error")}`, `${translate("user_not_found")}`)
            setText("user_not_found")
            setColorBackground(paperTheme.colors.notification)
            setTextColor("#fafafa")
            setSubcolorButton("#fafafa")
            break;
        case 500:
            // return { status: 500, name: "internal_server_error" }
            // Alert.alert(`${translate("error")}`, `${translate("internal_server_error")}`)
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