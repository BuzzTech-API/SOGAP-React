
export function formatDateToBrasil(data: string) {
    if (data.length > 10) {
        data = formatData(new Date(data))
    }

    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split('-')[0]
    const month = data.split('-')[1] // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split('-')[2]
    const formattedDate = `${day}/${month}/${year}`
    return formattedDate

}

export const formatData = (today: Date) => {
    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = today.getFullYear()
    const month = today.getMonth() + 1 // getMonth() retorna um valor de 0-11 por isso o +1
    const day = today.getDate()
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`

    return formattedDate
}

export const formatToData = (data: string) => {
    // função para pegar a data atual e formatar para "ano/mes/dia"

    if (data.length > 10) {
        data = formatData(new Date(data))
    }

    // função para pegar a data atual e formatar para "ano/mes/dia"
    const year = data.split('-')[0]
    const month = data.split('-')[1] // getMonth() retorna um valor de 0-11 por isso o +1
    const day = data.split('-')[2]
    const newDate = new Date()
    newDate.setFullYear(Number.parseInt(year))
    newDate.setMonth(Number.parseInt(month)-1) // setMonth() retorna um valor de 0-11 por isso o +1
    newDate.setDate(Number.parseInt(day))

    return newDate
}