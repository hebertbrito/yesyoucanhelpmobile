import React from 'react'

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
            setText("update_message")
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
            setColorBackground(paperTheme.colors.third)
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

export function validationfields(password: string, newpassword: string, confirmpassword: string, setError: React.Dispatch<React.SetStateAction<boolean>>) {

    if (password.length < 7 && newpassword.length < 7 && confirmpassword.length < 7) {
        setError(true)
        return false
    }

    if (newpassword != confirmpassword) {
        setError(true)
        return false
    }

    return true
}