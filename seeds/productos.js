exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('productos').del()
    .then(function () {
    return knex('productos').insert([
      {nombre: 'cara_feliz', tipo: 'playera', genero: 'M', precio: 250.00, descripcion: 'Playera amarilla con una cara feliz.'},
      {nombre: 'sencilla_blanca_cc', tipo: 'playera', genero: 'M', precio: 200.00, descripcion: 'Playera blanca sin estampado con cuello circular.'},
      {nombre: 'short_mezclilla', tipo: 'short', genero: 'M', precio: 299.99, descripcion: 'Short de mezclilla desgastado.'},
      {nombre: 'pantalon_mezclilla_negro', tipo: 'pantalon', genero: 'H', precio: 560.26, descripcion: 'Pantalon de mezclilla de color negro.'},
      {nombre: 'spiderman_caricatura', tipo: 'playera', genero: 'H', precio: 410.15, descripcion: 'Playera de Spiderman en caricatura.'},
      {nombre: 'negro_sencillo_cc', tipo: 'playera', genero: 'H', precio: 200.00, descripcion: 'Playera de color negro con cuello circular.'}
    ]);
  })
};
