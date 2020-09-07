export interface User {
    message?: string,
    firstname?: string,
    lastname?: string,
    country?: string,
    cpf_cnpj?: string,
    password?: string,
    email?: string,
    token?: string,
    address?: {
        city?: string,
        number?: string,
        neighbourhood?: string,
        state?: string
    }
    avatarsource?: {}
}