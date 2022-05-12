const knex = require('../database/connection');

exports.allSalesman = () => {
    return knex.select('*').from('usuarios').where({'rol':'cajero'})
}