const knex = require('../database/connection');

exports.menProducts = () =>{
    return knex.select('*').from('productos').where({'genero':'H'});
}


exports.womenProducts = () =>{
    return knex.select('*').from('productos').where({'genero':'M'});
}
