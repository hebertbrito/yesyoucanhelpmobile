import { ModelList } from './ModelList'

export interface AskContributionModel {
    idDocument?: string,
    CEP?: number,
    lat?: number,
    long?: number,
    products?: Array<ModelList>
}