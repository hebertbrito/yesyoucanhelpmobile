import RNFetchBlob from 'rn-fetch-blob'
import axios from 'axios'
import { BASE_URL } from '../index'
import { UserLogin, AvatarUser } from 'src/models'

export const AddAvatar = async function (avatarsource: AvatarUser, user: UserLogin) {
    try {
        const response = await RNFetchBlob.fetch('POST', `https://multer-teste.herokuapp.com/setAvatarUser2/${user.idDocument}`, {
            'Content-Type': 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'avatar', filename: avatarsource.fileName, data: avatarsource.data }
        ])
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export const AddAvatar_Return_Data = async function (avatarsource: AvatarUser, user: UserLogin) {
    try {

        const response = await RNFetchBlob.fetch('POST', `${BASE_URL}statics/insert/avatars/${user.idDocument}`, {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { name: 'avatar', filename: avatarsource.fileName, data: avatarsource.data }
        ])
        console.log(response.json())
    } catch (error) {
        console.log(error)
    }
}

export const RemoveAvatar = async function (user: UserLogin) {
    try {
        if (user.avatarsource?.fileName) {
            const response = await axios.delete(`https://multer-teste.herokuapp.com/remove/${user.idDocument}/${user.avatarsource.fileName}`)
            console.log(response.data)

        }

        //apagar o avatarsource do asyncstorage do usuario, e do objeto atual em uso
        

    } catch (error) {
        console.log(error)
    }
}

