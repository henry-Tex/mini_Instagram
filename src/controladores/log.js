const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { localizarUsuario } = require('../helpers/localizarUsuario');
const senhaJwt = require('../senhaJwt')

async function log(req,res) {
    const {username,senha} = req.body
    if(!username||!senha)return res.status(400).json({mensagem:"Favor preencher username e senha corretamente"});
    try {
        // verificar se usuario existe
        const usuario = await localizarUsuario(username)
        if (!usuario)return res.status(404).json({mensagem:"Usuário e senha incorretos"});
        //verificar senha
        const senhaVerificada = await bcrypt.compare(senha,usuario.senha);
        if (!senhaVerificada) return res.status(404).json({mensagem:"Usuario e senha incorretos"});
        //gerar token
        const usuarioLogado = usuario.username;
        const token = jwt.sign({username},senhaJwt,{expiresIn:'24h'});
        return res.status(200).json({usuarioLogado,token})
    } catch (error) {
        return res.status(400).json(error.message);
    }
};
module.exports=log;