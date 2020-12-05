export interface AdvancedSearch {
    startdate: string,
    enddate: string,
    rating?: string,
    accept?: string,
    product?: string,
    typeaction: string
}

export interface AdvancedSearchResponse {
    idDocument: string,
    ownname: string,
    product: string,
    createdAt: {
        _seconds: number,
        _nanoseconds: number
    },
    description: string
}

export interface LisdtAdvancedDatas {
    lstDatas: AdvancedSearchResponse[]
}

export interface ContributionsAdvanced {
    idDocument: string,
    name: string,
    lastname: string,
    createdAt: {
        _nanoseconds: number,
        _seconds: number
    },
    accept: boolean,
    cep: string,
    description: string,
    uri: string,
    product: string,
    number: number
}
export interface AskContributionsAdvanced {
    idDocument: string,
    name: string,
    lastname: string,
    createdAt: {
        _nanoseconds: number,
        _seconds: number
    },
    accept: boolean,
    cep: string,
    description: string,
    uri: string,
    product: string,
    number: number
}

export interface HouselessAdvanced {
    idDocument: string,
    name: string,
    createdAt: {
        _nanoseconds: number,
        _seconds: number
    },
    rating: number,
    cep: string,
    description: string,
    uri: string
}