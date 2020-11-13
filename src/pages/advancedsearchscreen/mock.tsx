export function GetFormatDate(date: Date) {
    const day = date.getDate();
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    return `${year}/${month}/${day}`
}

export function ValidationInputDate(startdate: string, enddate: string) {

    if (new Date(enddate) > new Date(startdate)) {
        return true
    } else if(enddate === startdate){
        return true
    }else{
        return false
    }
}