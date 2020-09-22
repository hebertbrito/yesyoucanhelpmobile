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