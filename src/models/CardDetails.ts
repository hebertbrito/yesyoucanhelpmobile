export interface CardDetails {
    idDocument: string,
    name?: string,
    description: string,
    email: string,
    uri: any,
    urihouseless?: any,
    createdAt: {
        _nanoseconds: number,
        _seconds: number
    },
    type: string,
    firstname: string,
    lastname: string,
    product?: string,
    number?: number
}