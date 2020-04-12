module.exports = {
  date(timestap) {
    const data = new Date(timestap);

    //não precisa do utc mais, o banco de dados se encarrega disso;
    const year = data.getFullYear();
    const month = `0${data.getMonth() + 1}`.slice(-2);
    const day = `0${data.getDate()}`.slice(-2);
    const hour = data.getHours();
    const minutes = data.getMinutes();

    return {
      day,
      month,
      hour,
      minutes,
      iso: `${year}-${month}-${day}`,
    };
  },
  formatBRL(price) {
    return Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
      }).format(price / 100).replace(',', '.');
  },
};
