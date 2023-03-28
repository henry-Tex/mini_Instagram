const knex = require("../conexao/conexao");
const { localizarUsuario } = require("../helpers/localizarUsuario");

async function cadastrarPostagens(req,res) {
    const {id} = req.usuario
    const {texto,fotos} = req.body
    if (!fotos||fotos.length === 0) return res.status(400).json({mensagen:"Favor cadastrar pelo menos uma foto"})
    try {
        // inserir postagem na tabela postagens
        const postagem = await knex('postagens').insert({usuario_id:id,texto}).returning('*');
        if(!postagem)return res.status(400).json("não foi possível concluir a postagem");
        // inserir foto na tabela postagens_fotos
        const postagem_id = postagem[0].id;
        for (const foto of fotos) { //inserir id no objeto de array fotos
            foto.postagem_id = postagem_id;
        }
        const fotosCadastradas = await knex('postagem_fotos').insert(fotos);
        console.log(fotosCadastradas)
        if (!fotosCadastradas){
            await knex('postagens').where({id:postagem_id}).del();
            return res.status(400).json("Não foi possível concluir a postagem.")
        }
        return res.status(400).json("Fotos cadastradas com sucesso.")
    } catch (error) {
        return res.status(400).json(error.message)  
    }
}

async function listarPostagens(req,res) {
    try {
        const username = req.usuario.username;
        const usuario = localizarUsuario(username)
    } catch (error) {
        return res.status(400).json(error.message)    
    }
};

module.exports={listarPostagens,cadastrarPostagens}