export interface AdvancedSearch {
    startdate: string,
    enddate: string,
    rating?: string,
    accept?: string,
    products?: string,
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