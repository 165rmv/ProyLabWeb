const bcrypt = require('bcryptjs')

exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('tiendas').del();
  await knex('usuarios').del();
  await knex('productos').del();
  await knex('inventario').del();
  await knex('tickets').del();
  await knex('ventas').del();

  await knex('tiendas').insert([
    {nombre: 'Tienda 1', lat: 19.299713, lon: -99.1371403},
    {nombre: 'Tienda 2', lat: 19.304543, lon: -99.1657200},
    {nombre: 'Tienda 3', lat: 19.319611, lon: -99.1389991}
  ]);
  await knex('usuarios').insert([
    {nombre: 'Empleado Antiguo', apellido: '', rol: 'noTocar', currency: 'EUR', email: 'noTocar', password: bcrypt.hashSync('noTocar', 10)},
    {nombre: 'Pedro', apellido: 'Ramirez', rol: 'cajero', currency: 'MXN', email: 'pedrito_16@gmail.com', password: bcrypt.hashSync('50hellmanns', 10)},
    {nombre: 'Diego', apellido: 'Aguilar', rol: 'cajero', currency: 'MXN', email: 'zerrets@gmail.com', password: bcrypt.hashSync('perritosb0n1t0s', 10)},
    {nombre: 'Alejandro', apellido: 'Martinez', rol: 'cajero', currency: 'MXN', email: 'ale_martinez@gmail.com', password: bcrypt.hashSync('Pepsiman93', 10)},
    {nombre: 'Emiliano', apellido: 'Pineda', rol: 'gerente', currency: 'MXN', email: 'emi.rock11@hotmail.com', password: bcrypt.hashSync('Pepsiman93', 10)},
    {nombre: 'Valeria', apellido: 'Fuente', rol: 'duenio', currency: 'MXN', email: 'aesthfashi.sa@gmail.com', password: bcrypt.hashSync('v4lFuente', 10)}
  ]);
  await knex('productos').insert([
    {nombre: 'Producto antiguo', tipo: 'eliminado', genero: 'M', precio: 250.00, descripcion: 'noTocar', img: 'noTiene'},
    {nombre: 'Playera feliz', tipo: 'playera', genero: 'M', precio: 250.00, descripcion: 'Playera amarilla con una cara feliz.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FplayeraCaraFeliz.jpg?alt=media&token=4b816db1-f1a1-4206-8e79-062fb836ef1b'},
    {nombre: 'Playera blanca', tipo: 'playera', genero: 'M', precio: 100.00, descripcion: 'Playera blanca sin estampado con cuello circular.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FplayeraBlanca.jpg?alt=media&token=f8f62157-cb58-47c2-a6a9-f23a36f67fbb'},
    {nombre: 'Short de mezclilla', tipo: 'short', genero: 'M', precio: 299.99, descripcion: 'Short de mezclilla desgastado.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FshortMezclilla.jpg?alt=media&token=210e4197-e049-4053-a2c1-bab6eb5b99b5'},
    {nombre: 'Pantalon de mezclilla', tipo: 'pantalon', genero: 'H', precio: 560.26, descripcion: 'Pantalon de mezclilla de color negro.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FMezcillaNegra.jpg?alt=media&token=77995649-b47d-41af-ab39-591f3b8106aa'},
    {nombre: 'Playera de Spiderman', tipo: 'playera', genero: 'H', precio: 300.15, descripcion: 'Playera de Spiderman en caricatura.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FplayeraSpiderman.jpg?alt=media&token=cf6f5437-c022-4772-8e4f-6a6bfb5dc8e5'},
    {nombre: 'Playera negra', tipo: 'playera', genero: 'H', precio: 150.00, descripcion: 'Playera de color negro con cuello circular.', img: 'https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/fotosProductos%2FplayeraNegra.jpg?alt=media&token=9b58cb29-dee3-4dd6-9d9c-4794513c33fe'}
  ]);
  await knex('inventario').insert([
    {id_producto: 2, cantidad: 6, talla: 'CH'},
    {id_producto: 2, cantidad: 9, talla: 'M'},
    {id_producto: 2, cantidad: 15, talla: 'G'},
    {id_producto: 2, cantidad: 9, talla: 'XG'},
    {id_producto: 3, cantidad: 11, talla: 'CH'},
    {id_producto: 3, cantidad: 10, talla: 'M'},
    {id_producto: 3, cantidad: 8, talla: 'G'},
    {id_producto: 4, cantidad: 12, talla: 'M'},
    {id_producto: 4, cantidad: 9, talla: 'G'},
    {id_producto: 5, cantidad: 10, talla: 'CH'},
    {id_producto: 5, cantidad: 5, talla: 'M'},
    {id_producto: 5, cantidad: 6, talla: 'G'},
    {id_producto: 6, cantidad: 5, talla: 'CH'},
    {id_producto: 6, cantidad: 10, talla: 'M'},
    {id_producto: 6, cantidad: 9, talla: 'G'},
    {id_producto: 7, cantidad: 2, talla: 'CH'},
    {id_producto: 7, cantidad: 4, talla: 'M'},
    {id_producto: 7, cantidad: 6, talla: 'G'},
  ]);
  await knex('tickets').insert([
    {total: 250.00, id_usuario: 2},
    {total: 450.00, id_usuario: 4},
    {total: 299.99, id_usuario: 4},
    {total: 410.15, id_usuario: 2},
    {total: 250.00, id_usuario: 4},
    {total: 250.00, id_usuario: 2},
  ]);
  await knex('ventas').insert([
    {id_ticket: 1, id_producto: 2},
    {id_ticket: 2, id_producto: 2},
    {id_ticket: 2, id_producto: 3},
    {id_ticket: 3, id_producto: 4},
    {id_ticket: 4, id_producto: 6},
    {id_ticket: 5, id_producto: 2},
    {id_ticket: 6, id_producto: 2},
  ]);
};