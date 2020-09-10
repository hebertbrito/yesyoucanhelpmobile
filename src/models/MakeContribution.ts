import { ModelList } from './ModelList'

export interface MakeContributionModel {
    idDocument: string;
    lat: number;
    long: number;
    products: ModelList[];
}