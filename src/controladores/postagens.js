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
    const {offset} = req.query
    const id = req.usuario.id
    const off = offset ? offset : 0;
    try {
        //const postagens = knex('postagens').limit(10).offset(off);
        //puxar postagens de terceiros
        const postagens = await knex('postagens')
        .where('usuario_id','!=',id)
        .limit(10)
        .offset(off);
        //não existindo postagem volta um array vazio
    if (postagens===0)return res.status(200).json(postagens); 
            //montando feed
            //usuario
        for (const postagem of postagens) {
            const usuario = await knex('usuarios')
            .where({id: postagem.usuario_id})
            .select('imagem','username','perfil_oficial').first()
            postagem.usuario = usuario
            //fotos
            const fotos = await knex('postagem_fotos')
            .where({postagem_id: postagem.id})
            .select('imagem')
            postagem.fotos = fotos;
            //curtidas
            const curtidas = await knex('postagem_curtidas')
            .where({postagem_id:postagem.id})
            .select('usuario_id');
            postagem.curtidas = curtidas.length
            //se curtido pelo usuário logado
            postagem.curtidoPorMin = curtidas.find (curtida => curtida.usuario_id === id) ? true : false;
            //comentarios
            const comentarios = await knex('postagem_comentarios as pc')
            .leftJoin('usuarios','usuarios.id','pc.usuario_id')
            .where({postagem_id:postagem.id})
            .select('usuarios.username','pc.texto')
            postagem.comentarios=comentarios;
        }
        return res.status(200).json(postagens)
    } catch (error) {
        return res.status(400).json(error.message)    
    }
};

module.exports={listarPostagens,cadastrarPostagens};

        // const postagensCurtidas = await knex.from('postagens as p').select('p.id','p.texto','pcu.usuario_id')
        // .join('postagem_curtidas as pcu','pcu.postagem_id','=','p.id').first();
        // if(postagensCurtidas.usuario_id===usuarioID) console.log('oi')
        // const postagensFotos = await knex.from('postagens as p').select('p.id','p.texto','imagem')
        // .join('postagem_fotos as pf','pf.postagem_id','=','p.id');
        //.join('postagem_comentarios as pco','pco.postagem_id','=','p.id');
        // const postagens = await knex.from('postagens as p').select('*')
        // .join('postagem_curtidas as pc','pc.postagem_id','=',"p.id");