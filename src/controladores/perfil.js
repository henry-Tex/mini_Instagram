const knex = require("../conexao/conexao");
const senhaCrypto = require("../helpers/criptografarSenha");
const { localizarUsuario } = require("../helpers/localizarUsuario");

function listarPerfil(req,res) {
    const {id:$,...usuario} = req.usuario;
    return res.status(200).json(usuario);
};

async function editarPerfil(req,res) {
    const {username,senha,imagem,nome,site,bio,email,telefone,genero} = req.body;
    if(!username&&!senha&&!imagem&&!nome&&!site&&!bio&&!email&&!telefone&&!genero){
    return res.status(404).json({mensagem:'Preenche ao menos um campo para atualizar os dados'})};
    try {
        //verificar o novo username e email, caso já existe não será possível alterar
        if(username){
            const usuarioVerificado = await localizarUsuario(username)
            if(usuarioVerificado)return res.status(400).json({mensagem:"O username informado já está sendo utilizado"})}
        if (email){
            const emailVerificado = await localizarUsuario(username)
            if(emailVerificado)return res.status(400).json({mensagem:"O email informado já está sendo utilizado"})}
        //criptografar senha
        let senhaCripto = null;
        if (senha){
            if(senha.lenght < 5) return res.status(404).json({mensagem:'A senha deve contar no mínimo 5 caracteres'})
            senhaCripto = await senhaCrypto(senha)};
        //Atualizar banco de dados    
        const atualizarUsuario = {
            username,
            senha:senhaCripto,
            imagem,
            nome,
            site,
            bio,
            email,
            telefone,
            genero
        };
        const id = req.usuario.id;
        const perfilUsuario = await knex('usuarios').update(atualizarUsuario).where('id',id).returning('*');
        return res.status(204).json({mensagem:'Dados atualizados com sucesso'})
    } catch (error) {
        return res.status(400).json(error.message) 
    }
}

module.exports = {listarPerfil,editarPerfil}