
import { AvatarUser, User } from '../../models'
export const GetNewValues = (data: User, subdata: any) => {
    const lstValidate = ['firstname', 'lastname', 'datebirth', 'gender',
        'email', 'cellphone'
    ]
    const lstAddresValidate = ['country', 'city', 'street', 'number', 'state', 'CEP', 'neighbourhood']
    let objNewValues: User = {}

    // objNewValues = data

    if (data) {
        for (const iterator of lstValidate) {
            if (data[iterator] && data[iterator] != "") {
                objNewValues[iterator] = data[iterator]
            }

        }
    }

    if (subdata) {
        for (const itemSubData of lstAddresValidate) {
            if (subdata[itemSubData] && subdata[itemSubData] != "") {
                objNewValues['address'] = {
                    ...objNewValues['address'],
                    [itemSubData]: subdata[itemSubData]
                }
            }
        }
    }

    // if (objNewValues && objNewValues != null) {
    //     return objNewValues;
    // }

    return objNewValues;
}

export function verifyConfirm(newPassword: string, confirmPassword: string ) {
    
}