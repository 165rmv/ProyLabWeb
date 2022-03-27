exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
    return knex('tickets').insert([
      {total: 250.00, id_usuario: 1},
      {total: 450.00, id_usuario: 3},
      {total: 299.99, id_usuario: 3},
      {total: 410.15, id_usuario: 1},
      {total: 250.00, id_usuario: 3},
      {total: 250.00, id_usuario: 1},
    ]);
  })
};