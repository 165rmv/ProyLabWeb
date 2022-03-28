const knex = require('../database/connection');
let alert = require('alert');

exports.allInventory = () =>{
    return knex.select(knex.raw('inventario.id, inventario.id_producto, inventario.cantidad, inventario.talla, productos.nombre, productos.tipo, productos.genero, productos.precio')).from('inventario').join('productos', {'productos.id': 'inventario.id_producto'});
}

exports.allProducts = () =>{
    return knex.select('*').from('productos');
}

exports.findByIdInProducts = (idProduct) =>{
    idP = parseInt(idProduct)
    let product = knex.select('*').from('productos').where({id: idP}).first();
    if(product){
        return product
    }
    else{
        throw new Error(`No existe un producto con el id: ${idProduct}`)
    }
}

exports.findByIdInInventory = (idInventory) =>{
    idP = parseInt(idInventory)
    let product = knex.select('*').from('inventario').where({id: idP});
    if(product){
        return product
    }
    else{
        throw new Error(`No existe un producto con el id: ${idProduct}`)
    }
}


exports.insertProducts = (product) => {
    return knex('productos')
      .insert({nombre: product.nombre, tipo: product.tipo, genero: product.genero, precio: product.precio, descripcion: product.descripcion });
}

exports.getIdLastProduct = () => {
    return knex.select('id').from('productos').orderBy('id', 'desc').limit(1);
}

exports.insertInventory = (product) => {
    return knex('inventario')
      .insert({id_producto: product.id_producto, talla: product.talla, cantidad: product.cantidad});
}

exports.updateProducto = (id, producto) => {
    return knex('productos')
    .update(producto)
    .update('updated_at', knex.fn.now())
    .where('id', parseInt(id));
}

exports.updateInventario = (id, inventario) => {
    idInt = parseInt(id)
    return knex('inventario')
        .update(inventario)
        .update('updated_at', knex.fn.now())
        .where({id: idInt});
}


exports.deleteInventario = (id) => {
    idInt = parseInt(id)
    return knex('inventario').where({id: idInt}).del();
}


exports.deleteProducto = (id) => {
    idInt = parseInt(id)
    result = knex('productos').where({id: idInt}).del();
    alert("Error: "+err.message)
    return result
}

