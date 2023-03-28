const jwt = require('jsonwebtoken');
const knex = require('knex');
const {localizarUsuario} = require('../helpers/localizarUsuario');
const senhaJwt = require('../senhaJwt');

async function autenticador(req,res,next) {
    const {authorization} = req.headers
    if(!authorization)return res.status(401).json({mensagem:'Não autorizado'});
    const token = authorization.split(' ')[1];
    try {
        //extrair identificador do token
        const {username} = jwt.verify(token,senhaJwt);
        //verificar se usuario existe
        const usuarioLogado = await localizarUsuario(username);
        if(!usuarioLogado)return res.status(401).json({mensagem:'Não autorizado'});
        const {senha:$,...usuario} = usuarioLogado;
        req.usuario = usuario;
        next() 
    } catch (error) { 
        return res.status(404).json(error.message)  
    }
};
module.exports=autenticador;
