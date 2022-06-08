const { parse } = require("dotenv");

exports.validateAddUser = function(nombre, apellido, mail){
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let errors = []
    if(nombre == 0 ){
        errors.push({'param':'Vacío', 'msg':'Input de nombre vacío'})
    }
    if(apellido == 0 ){
        errors.push({'param':'Vacío', 'msg':'Input de apellido vacío'})
    }
    if(mail == 0 ){
        errors.push({'param':'Vacío', 'msg':'Input de correo electronico vacío'})
    }else if(!regex.test(mail)){
        errors.push({'param':'Sintaxis', 'msg':'Correo electronico no válido'})
    }
    return errors
}

exports.validateAddSale = function(id_inventario){
    let errors = []
    if(id_inventario.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input del id del inventario vacío'})
    }
    return errors
}

exports.validateAddProduct = function(nombre, tipoPrenda, talla, genero, precio, cantidadPrendas, descripcion){
    let regPrecio = new RegExp('^[0-9]{1,6}([.][0-9]{1,2})?$')
    let errors = []

    if(nombre.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input del nombre vacío'})
    }
    if(precio.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input del precio vacío'})
    }else if(!regPrecio.test(precio)){
        errors.push({'param':'Sintaxis', 'msg':'El precio debe contener máximo dos decimales y no más de 9 caracteres (incluyendo el punto)'})
    }
    if(cantidadPrendas.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input de la cantidad de prendas vacío'})
    }
    if(descripcion.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input de la descripcion vacío'})
    }
    return errors
}

exports.validateEditInventoryProduct = function(cantidadPrendas){
    let errors = []

    if(cantidadPrendas.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input de la cantidad de prendas vacío'})
    }
    return errors
}

exports.validateEditProductsProduct = function(precio, nombre, descripcion){
    let regPrecio = new RegExp('^[0-9]{1,6}([.][0-9]{1,2})?$')
    let errors = []

    if(nombre.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input del nombre vacío'})
    }
    if(precio.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input del precio vacío'})
    }else if(!regPrecio.test(precio)){
        errors.push({'param':'Sintaxis', 'msg':'El precio debe contener máximo dos decimales y no más de 9 caracteres (incluyendo el punto)'})
    }
    if(descripcion.length == 0){
        errors.push({'param':'Vacío', 'msg':'Input de la descripcion vacío'})
    }
    return errors
}