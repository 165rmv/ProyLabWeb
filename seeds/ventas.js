exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ventas').del()
    .then(function () {
    return knex('ventas').insert([
      {id_ticket: 1, id_producto: 1},
      {id_ticket: 2, id_producto: 1},
      {id_ticket: 2, id_producto: 2},
      {id_ticket: 3, id_producto: 3},
      {id_ticket: 4, id_producto: 5},
      {id_ticket: 5, id_producto: 1},
      {id_ticket: 6, id_producto: 1},
    ]);
  })
};