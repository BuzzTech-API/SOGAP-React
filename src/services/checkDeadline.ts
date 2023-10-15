import { formatData } from "./formatDate"


//Função para devolver a diferença em dias entre a data de Hoje e o prazo dado no input, o input deve vir como yyyy-mm-dd

function getDaysBetweenDates(dateStr1: string, dateStr2: string): number {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    const timeDifference = date2.getTime() - date1.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.abs(daysDifference); // Use Math.abs to ensure a positive result
}

//O input vai ser a data final a ser checada e deve vir no formato yyyy-mm-dd
export function checkDeadline(endDate: Date) {

    let data_Atual = formatData(new Date())
    let data_Final = endDate.toString()

    getDaysBetweenDates(data_Final, data_Atual)

    return getDaysBetweenDates(data_Final, data_Atual)
}