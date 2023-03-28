const cadastro = require('./controladores/cadastro');
const { curtidas, comentar } = require('./controladores/curtidas');
const log = require('./controladores/log');
const { listarPerfil, editarPerfil } = require('./controladores/perfil');
const { listarPostagens, cadastrarPostagens } = require('./controladores/postagens');
const autenticador = require('./intermediarios/autenticacao');

const rotas = require('express')();

//cadastro
rotas.post('/cadastro',cadastro);
//login
rotas.post('/login',log);
//intermediário
rotas.use(autenticador);
//rotas de usuario
rotas.get('/perfil',listarPerfil)
rotas.put('/perfil',editarPerfil)
//postagens
rotas.get('/postagem',listarPostagens)
rotas.post('/postagem',cadastrarPostagens)
//curtida
rotas.post('/postagem/:id/curtir',curtidas)
//comentar
rotas.post('/postagem/:id/comentar',comentar)

module.exports=rotas;