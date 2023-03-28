const express = require('express');
const rotas = require('./rotas');
const cors = require('cors')
const servidor = express();
require('dotenv').config();

servidor.use(express.json());
servidor.use(cors());
servidor.use(rotas);

const port = process.env.PORT || 3003;
servidor.listen(port,()=>console.log(`Servidor rodando na porta ${port}`))