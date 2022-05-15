const knex = require('../database/connection');

exports.allSalesman = () => {
    return knex.select('*').from('usuarios').where({'rol':'cajero'})
}

exports.allUsers = () => {
    return knex.select('*').from('usuarios').whereNot({'rol':'noTocar'})
}

exports.insertUser = (nombre, apellido, rol, email, password) => {
    return knex('usuarios')
    .insert({nombre: nombre, apellido: apellido, rol: rol, email: email, password: password});
}

exports.deleteUser = (id) => {
    idInt = parseInt(id)
    return knex('usuarios').where({id: idInt}).del();
}