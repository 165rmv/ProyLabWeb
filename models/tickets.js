const knex = require('../database/connection');

exports.insertTicket = (total, id_usuario) => {
    return knex('tickets')
    .insert({total: total, id_usuario: id_usuario});
}

exports.allTickets = () =>{
    return knex.select('*').from('tickets');
}

exports.updateTicket = (id, ticket) => {
    return knex('tickets')
    .update(ticket)
    .update('updated_at', knex.fn.now())
    .where('id', parseInt(id));
}

exports.getTicketById = (id) => {
    idT = parseInt(id);
    let ticket = knex.select('*').from('tickets').where({id: idT}).first();
    if(ticket){
        return ticket
    }
    else{
        throw new Error(`No existe un ticket con el id: ${id}`)
    }
}

exports.getTicketsByUserId = (userId) => {
    uId = parseInt(userId);
    let ticket = knex.select('*').from('tickets').where({'id_usuario': uId});
    if(ticket){
        return ticket
    }
    else{
        throw new Error(`No existen tickets con el id: ${userId}`)
    }
}

exports.getLastTicket = () => {
    let ticket = knex.select('*').from('tickets').orderBy('id', 'desc').first();
    if(ticket){
        return ticket
    }
    else{
        throw new Error(`No hay ningun ticket en la tabla`)
    }
}