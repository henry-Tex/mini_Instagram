const knex = require('knex')({
    client:'pg',
    connection:{
        host:'localhost',
        port:5432,
        user:'postgres',
        password:'041417',
        database:'mini_insta'
    }
});
module.exports=knex;