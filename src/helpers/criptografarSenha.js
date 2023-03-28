const bcrypt = require('bcrypt')

async function senhaCrypto(senha) {
    const senhaCripto = await bcrypt.hash(senha,10);
    return senhaCripto;
};

module.exports=senhaCrypto;