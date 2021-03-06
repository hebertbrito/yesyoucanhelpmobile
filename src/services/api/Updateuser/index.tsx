import axios from 'axios'
import { BASE_URL } from '../index'
import { UserLogin, AvatarUser, User } from 'src/models'
import { AddAvatar, RemoveAvatar } from '../StaticFiles'
import { ValidationException } from '../../../helpers/errors/validation'

export const UpdateUser = async function (objNewValues: User, avatarsource: AvatarUser, user: UserLogin) {
    try {
        let message = ""
        if (Object.keys(objNewValues).length > 0) {
            await axios.put(`${BASE_URL}user/updateuser`, Object.assign({}, objNewValues, { idDocument: user?.idDocument }), {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
        }

        if (avatarsource.data) {
            if (user.avatarsource?.fileName == "") {
                await AddAvatar(avatarsource, user)
            } else {
                await RemoveAvatar(user)
                await AddAvatar(avatarsource, user)
            }
        }
    } catch (error) {
        const value = ValidationException(error)
        return Promise.reject(value)
    }
}