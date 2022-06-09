const knex = require('../database/connection');

exports.menProducts = () =>{
    return knex.select('*').from('productos').where({'genero':'H'}).whereNot({'descripcion':'noTocar'});
}


exports.womenProducts = () =>{
    return knex.select('*').from('productos').where({'genero':'M'}).whereNot({'descripcion':'noTocar'});
}
