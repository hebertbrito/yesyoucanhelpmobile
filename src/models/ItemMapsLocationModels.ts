export interface ItemMapsLocationModels {
    idDocument?: string,
    product?: string,
    description?: string,
    number?: string,
    latitude?: number,
    longitude?: number,
    latitudeDelta?: number,
    longitudeDelta?: number
}

export interface ItemMapsSpecificLocation {
    id: string,
    product: string,
    description: string,
    number: string,
    uri: string,
    ownname: string,
    createdAt: {
        _seconds: number,
        _nanoseconds: number
    }
}