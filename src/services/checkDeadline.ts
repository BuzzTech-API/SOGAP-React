import { formatData } from "./formatDate"

function getDaysBetweenDates(dateStr1: string, dateStr2: string): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const timeDifference = date2.getTime() - date1.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.abs(daysDifference); // Use Math.abs to ensure a positive result
}

export function checkDeadline(endDate: Date) {

    let data_Atual = formatData(new Date())
    let data_Final = endDate.toString()

    getDaysBetweenDates(data_Final, data_Atual)

    return getDaysBetweenDates(data_Final, data_Atual)
}