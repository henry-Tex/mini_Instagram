const knex = require("../conexao/conexao");
const {localizarUsuario} = require("../helpers/localizarUsuario");
const senhaCrypto = require("../helpers/criptografarSenha");

async function cadastro(req,res) {
    const {username,senha} = req.body;
    if(!username||!senha)return res.status(400).json({mensagem:"Favor preencher username e senha corretamente"});
    try {
        // verificar se usuario existe
        const usuario = await localizarUsuario(username);
        if(usuario) return res.status(404).json({messagem:"Usuário já existe"})
        //criptografar senha
        if(senha.lenght < 5) return res.status(404).json({mensagem:'A senha deve contar no mínimo 5 caracteres'})
        const senhaCripto = await senhaCrypto(senha);
        //inserir usuario no BD
        const usuarioNovo = {
            username,
            senha:senhaCripto
        };
        const usuarioInserido = await knex('usuarios').insert(usuarioNovo).returning('username');
        //retornar usuario com mensagem de sucesso
        return res.status(201).json(usuarioInserido)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports=cadastro;