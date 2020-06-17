const db = require("../../config/db");
const { hash } = require("bcryptjs");

const Products = require("./productsModels");
const fs = require("fs");

module.exports = {
  async create(data) {
    try {
      const query = `
      INSERT INTO users (
        name,
        email,
        password,
        cpf_cnpj,
        cep,
        address
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `;

      // npm install bcryptjs --> {hash} --> o que faz? --> criptografa a senha  // ! obs: ela é uma promise;
      const passwordHash = await hash(data.password, 8); // ? 1º a senha em sí, e o nível de criptografia;

      const values = [
        data.name,
        data.email,
        passwordHash,
        data.cpf_cnpj.replace(/\D/g, ""),
        data.cep.replace(/\D/g, ""),
        data.address,
      ];

      const results = await db.query(query, values);
      return results.rows[0].id;
    } catch (err) {
      console.error(err);
    }
  },
  async findOne(filters) {
    let query = "SELECT * FROM users";

    Object.keys(filters).map((key) => {
      query = `${query} ${key}`;

      Object.keys(filters[key]).map((field) => {
        query = `${query} ${field} = '${filters[key][field]}'`;
      });
    });

    const results = await db.query(query);
    return results.rows[0];
  },
  async update(id, fields) {
    let query = "UPDATE users SET";

    // criando o query dinâmicamente;
    Object.keys(fields).map((key, index, array) => {
      if ((index + 1) < array.length) {
        query = `${query}
        ${key} = '${fields[key]}', `;

      } else {
        query = `${query}
        ${key} = '${fields[key]}'
        WHERE id = ${id}
        `;
      }
    });

    await db.query(query);
    return;
  },
  async delete(id) {
    // pegar todos os produtos do usuario;
    let results = await db.query("SELECT * FROM products WHERE user_id = $1", [
      id,
    ]);
    const products = results.rows;

    // dos produtos pegar todas as imagens;
    const allFilesPromise = products.map((product) =>
      Products.files(product.id)
    );

    let promiseResults = await Promise.all(allFilesPromise);

    // rodar a remoção do usuário;
    await db.query("DELETE FROM users WHERE id = $1", [id]);

    // remoção das imagens da pasta public/images;
    promiseResults.map((results) => {
      results.rows.map((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.error(err);

          return res.render("user/index", {
            error: "Algum erro aconteceu!",
          });
        }
      });
    });
  },
};
