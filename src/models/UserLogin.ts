export interface UserLogin {
    message?: string,
    idDocument?: string,
    firstname?: string,
    lastname?: string,
    token?: string,
    typeuser?: string,
    avatarsource?:{
        fileSize?: string,
        fileName?: string,
        uri?: string,
        type?: string
    }
}