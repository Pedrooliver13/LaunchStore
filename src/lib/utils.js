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
      currency: "BRL",
    })
      .format(price / 100)
      .replace(",", ".");
  },
  formatCpfCnpj(value) {
    // () -->  é um placeholder;
    if (value.length > 14) value.slice(0, -1);

    if (value.length > 11) {
      //cnpj --> 11.111.111/1111-11
      value = value.replace(/(\d{2})(\d)/, "$1.$2"); // 123.1212...
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 123.1212...
      value = value.replace(/(\d{3})(\d)/, "$1/$2"); // 123.1212...
      value = value.replace(/(\d{4})(\d)/, "$1-$2"); // 123.1212...
    } else {
      // cpf --> 506.555.388-20;
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 123.1212...
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // 123.121.123...
      value = value.replace(/(\d{3})(\d)/, "$1-$2"); // 123.121.123-12
    }

    return value;
  },
  formatCep(value) {
    value = value.replace(/\D/g, "");

    // cep --> 84990-000;
    if (value.length > 8) value = value.slice(0, -1); 

    value = value.replace(/(\d{5})(\d)/, "$1-$2");

    return value;
  }
};
