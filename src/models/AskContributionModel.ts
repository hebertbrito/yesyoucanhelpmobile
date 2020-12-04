import { ModelList } from './ModelList'

export interface AskContributionModel {
    idDocument?: string,
    CEP?: number,
    lat?: number,
    long?: number,
    products?: Array<ModelList>
}

export interface AskContribution{
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