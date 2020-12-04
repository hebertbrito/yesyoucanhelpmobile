import { ImagePickerResponse } from "react-native-image-picker";

export interface HouseLessModel {
    name?: string,
    description?: string,
    idDocument?: string,
    CEP?: number,
    lat?: number,
    long?: number,
    photo?: ImagePickerResponse,
    createdAt?: string
}

export interface Houseless{
    idDocument: string,
    name: string,
    description: string,
    accept: boolean,
    createdAt: {
        _seconds: number,
        _nanoseconds: number
    }
}