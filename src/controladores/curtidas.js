const knex = require("../conexao/conexao");
const localizarPostagem = require("../helpers/localizarPostagem");

async function curtidas(req,res) {
    try {
        const usuarioID = req.usuario.id
        const {id} = req.params
        //verificar se postagem existe
        const postagem = await localizarPostagem(id);
        if(!postagem) return res.status(404).json('A postagem não existe')
        //verificar se postgem já foi curtida
        const verificarCurtida = await knex('postagem_curtidas').where({postagem_id:id}).andWhere({usuario_id:usuarioID}).first();
        if(verificarCurtida)return res.status(400).json('A postagem já foi curtida')
        const curtida = await knex('postagem_curtidas').insert({postagem_id:id,usuario_id:usuarioID});
        if(!curtida)return res.status(400).json('Não foi possível curtir essa mensagem')
        return res.status(200).json("Curtida efetuada com sucesso")
    } catch (error) {
        return res.status(400).json(error.message)    
    }
};

async function comentar(req,res) {
    const usuarioID = req.usuario.id;
    const {id} = req.params;
    const {texto} = req.body
    if(!texto)return res.status(400).json('Favor preencher um comentário');
    try {
        //localizar postagem
        const postagem = await localizarPostagem(id);
        if(!postagem) return res.status(404).json('A postagem não existe')
        //registrar comentário
        const comentario = {usuario_id:usuarioID,postagem_id:id,texto};
        const comentar = await knex('postagem_comentarios').insert(comentario);
        if(!comentar)return res.status(400).json('Não foi possível registrar o comentário')
        return res.status(200).json('Comentário registrado com sucesso')
    } catch (error) {
        return res.status(400).json(error.message) 
    }
};

module.exports={curtidas,comentar}