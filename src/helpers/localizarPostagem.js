const knex = require("../conexao/conexao");

async function localizarPostagem(id) {
    const postagem = await knex('postagens').where({id}).first();
    return postagem
};

module.exports=localizarPostagem;