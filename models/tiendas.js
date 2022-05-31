const knex = require('../database/connection');

exports.allStores = () =>{
    return knex.select('*').from('tiendas');
}