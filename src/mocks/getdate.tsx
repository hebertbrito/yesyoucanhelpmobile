
const date = new Date();

export function GetDate() {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const DATE = `${day}/${month}/${year}`

    return DATE
}