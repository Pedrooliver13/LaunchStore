module.exports = {
    date(timestap){
        const data = new Date(timestap)

        const year = data.getFullYear()
        const month = `0${data.getUTCMonth()}`.slice(-2)
        const day = `0${data.getUTCDate()}`.slice(-2)

        return {
            iso:`${year}-${month}-${day}`
        }
    },
    formatBRL(price){
        return Intl.NumberFormat('pt-BR', {
            style:'currency',
            currency:'BRL'
        }).format(price/100)
    }
}