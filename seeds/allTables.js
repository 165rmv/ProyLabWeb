exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('usuarios').del();
  await knex('productos').del();
  await knex('inventario').del();
  await knex('tickets').del();
  await knex('ventas').del();

  await knex('usuarios').insert([
    {nombre: 'Pedro', apellido: 'Ramirez', rol: 'cajero', id_fb: 't7fUYt2f2yt3hjg271kU9Y0HG2j'},
    {nombre: 'Fernanda', apellido: 'Gutierrez', rol: 'gerente', id_fb: 'DhjyD2Blu44L78i09npI3hlñOUv'},
    {nombre: 'Alejandro', apellido: 'Martinez', rol: 'cajero', id_fb: 'dGRE27vbHYr9bE0vERfVRT83hWklu'}
  ]);
  await knex('productos').insert([
    {nombre: 'cara_feliz', tipo: 'playera', genero: 'M', precio: 250.00, descripcion: 'Playera amarilla con una cara feliz.'},
    {nombre: 'sencilla_blanca_cc', tipo: 'playera', genero: 'M', precio: 200.00, descripcion: 'Playera blanca sin estampado con cuello circular.'},
    {nombre: 'short_mezclilla', tipo: 'short', genero: 'M', precio: 299.99, descripcion: 'Short de mezclilla desgastado.'},
    {nombre: 'pantalon_mezclilla_negro', tipo: 'pantalon', genero: 'H', precio: 560.26, descripcion: 'Pantalon de mezclilla de color negro.'},
    {nombre: 'spiderman_caricatura', tipo: 'playera', genero: 'H', precio: 410.15, descripcion: 'Playera de Spiderman en caricatura.'},
    {nombre: 'negro_sencillo_cc', tipo: 'playera', genero: 'H', precio: 200.00, descripcion: 'Playera de color negro con cuello circular.'}
  ]);
  await knex('inventario').insert([
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
  await knex('tickets').insert([
    {total: 250.00, id_usuario: 1},
    {total: 450.00, id_usuario: 3},
    {total: 299.99, id_usuario: 3},
    {total: 410.15, id_usuario: 1},
    {total: 250.00, id_usuario: 3},
    {total: 250.00, id_usuario: 1},
  ]);
  await knex('ventas').insert([
    {id_ticket: 1, id_producto: 1},
    {id_ticket: 2, id_producto: 1},
    {id_ticket: 2, id_producto: 2},
    {id_ticket: 3, id_producto: 3},
    {id_ticket: 4, id_producto: 5},
    {id_ticket: 5, id_producto: 1},
    {id_ticket: 6, id_producto: 1},
  ]);
};