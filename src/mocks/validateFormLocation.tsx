import React from 'react'

export function validateFormLocation(CEP: string, number: string, neighborhood: string, street: string, setErrorFormLocation: React.Dispatch<React.SetStateAction<boolean>>) {
    if (CEP.length != 8 || number.length == 0 || neighborhood == "" || street.length < 5) {
        setErrorFormLocation(true)
        return false
    }

    return true
}