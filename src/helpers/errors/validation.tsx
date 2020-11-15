const regex = new RegExp(/\d+/)

export function ValidationException(data: string): number {

    const value = regex.exec(data.toString())

    if (value) {
        return parseInt(value[0])
    }

    return 0
}