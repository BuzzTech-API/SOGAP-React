
export function formatDateToBrasil(data: string) {
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