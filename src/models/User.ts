export interface User {
    firstname?: string,
    lastname?: string,
    datebirth?: string,
    RG?: string,
    cpf_cnpj?: string,
    gender?: string,
    password?: string,
    email?: string,
    cellphone?: string,
    typeuser?: string,
    token?: string,
    address?: {
        CEP?: string,
        city?: string,
        number?: string,
        neighbourhood?: string,
        street?: string,
        state?: string,
        country?: string,
    }
    avatarsource?: any
}