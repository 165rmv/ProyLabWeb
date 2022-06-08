const knex = require('../database/connection');

exports.allSalesman = () => {
    return knex.select('*').from('usuarios').where({'rol':'cajero'})
}

exports.allUsers = () => {
    return knex.select('*').from('usuarios').whereNot({'rol':'noTocar'})
}

exports.firsUser = () => {
    return knex.select('*').from('usuarios').where({'rol':'noTocar'})
}

exports.getUserByEmail = (email) => {
    return knex.select('*').from('usuarios').where({'email':email})
}

exports.insertUser = (nombre, apellido, rol, email, password) => {
    return knex('usuarios')
    .insert({nombre: nombre, apellido: apellido, rol: rol, currency:'MXN', email: email, password: password});
}

exports.deleteUser = (id) => {
    idInt = parseInt(id)
    return knex('usuarios').where({id: idInt}).del();
}

exports.getCurrency = () => {
    return knex.select('currency').from('usuarios').first();
}

exports.setCurrency = (usuario) => {
    return knex('usuarios')
    .update(usuario)
    .update('updated_at', knex.fn.now())
    .where('id', 1);
}