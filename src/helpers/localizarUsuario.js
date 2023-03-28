const knex = require('../conexao/conexao')

async function localizarUsuario(username) {
    const usuario = await knex('usuarios').where('username',username).first();
    return usuario;
};
async function localizarEmail(email) {
    const verificarEmail = await knex('usuarios').where('email',email).first();
    return email;
};

module.exports={localizarUsuario,localizarEmail};