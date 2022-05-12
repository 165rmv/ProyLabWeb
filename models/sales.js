const knex = require('../database/connection');

exports.all = () =>{
    temp1 = knex.select(knex.raw('t.id, t.created_at, t.id_usuario, u.nombre, count(*) as cantidad, sum(p.precio) as total_venta'))
    .from(knex.raw('tickets as t'))
    .join(knex.raw('ventas as v on t.id = v.id_ticket'))
    .join(knex.raw('usuarios as u on u.id = t.id_usuario'))
    .join(knex.raw('productos as p on p.id = v.id_producto'))
    .groupBy('t.id')
    .orderBy('t.id');
    return temp1
}

exports.allSales = () => {
    return knex.select('*').from('ventas')
}

exports.list_products_sold = (id_ticket) =>{
    return knex.select(knex.raw('p.nombre, p.precio, p.tipo'))
            .from(knex.raw('ventas as v'))
            .join(knex.raw('productos as p on v.id_producto = p.id'))
            .where({'v.id_ticket':id_ticket})
}

exports.vendor_ticket = (id_ticket) =>{
    return knex.select(knex.raw('u.nombre'))
            .from(knex.raw('tickets as t'))
            .join(knex.raw('usuarios as u on t.id_usuario = u.id'))
            .where({'t.id': id_ticket})
}

exports.time_stamp = (id_ticket) =>{
    return knex.select('created_at')
            .from('tickets')
            .where({id: id_ticket})
}

exports.insertSale = (id_ticket, id_producto) => {
    return knex('ventas')
    .insert({id_ticket: id_ticket, id_producto: id_producto});
}
