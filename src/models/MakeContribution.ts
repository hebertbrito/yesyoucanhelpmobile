import { ModelList } from './ModelList'

export interface MakeContributionModel {
    idDocument: string,
    lat: number,
    long: number,
    cep?: number,
    products: ModelList[]
}

export interface Contribution{
    idDocument: string,
    product: string,
    number: string,
    description: string,
    accept: boolean,
    createdAt: {
        _seconds: number,
        _nanoseconds: number
    }
}