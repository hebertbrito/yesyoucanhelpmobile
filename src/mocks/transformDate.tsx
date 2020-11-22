export const transformDate = function (timestamp: number): string{
    const _date = new Date(timestamp * 1000)
    const year = _date.getFullYear()
    const month = _date.getMonth() + 1
    const day = _date.getDate()

    return `${day}/${month}/${year}`
}