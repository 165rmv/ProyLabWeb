exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inventario').del()
    .then(function () {
    return knex('inventario').insert([
      {id_producto: 1, cantidad: 6, talla: 'CH'},
      {id_producto: 1, cantidad: 9, talla: 'M'},
      {id_producto: 1, cantidad: 15, talla: 'G'},
      {id_producto: 1, cantidad: 9, talla: 'XG'},
      {id_producto: 2, cantidad: 11, talla: 'CH'},
      {id_producto: 2, cantidad: 10, talla: 'M'},
      {id_producto: 2, cantidad: 8, talla: 'G'},
      {id_producto: 3, cantidad: 12, talla: '7'},
      {id_producto: 3, cantidad: 9, talla: '9'},
      {id_producto: 4, cantidad: 10, talla: 'CH'},
      {id_producto: 4, cantidad: 5, talla: 'M'},
      {id_producto: 4, cantidad: 6, talla: 'G'},
      {id_producto: 5, cantidad: 5, talla: 'CH'},
      {id_producto: 5, cantidad: 10, talla: 'M'},
      {id_producto: 5, cantidad: 9, talla: 'G'},
      {id_producto: 6, cantidad: 2, talla: 'CH'},
      {id_producto: 6, cantidad: 4, talla: 'M'},
      {id_producto: 6, cantidad: 6, talla: 'G'},
    ]);
  })
};