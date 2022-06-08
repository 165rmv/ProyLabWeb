let Inventario = require('../../models/inventario')
let Usuarios = require('../../models/usuarios')
let Validators = require('../../validators/AuthValidator')
let Ventas = require('../../models/sales')
const { use } = require('chai')

exports.inventory_list = (req, res) =>{
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else{
                Inventario.allInventory()
                .then((data) => {
                    res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, userDB: user[0], success: false, successMsg:''});
                });
            }
        })
    }
}

exports.productos_list = (req, res) =>{
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else{
                Inventario.allProducts()
                .then((data) =>{
                    res.render('admin_salesman/inventory/allProducts', {title: 'Administrar productos', data: data, success:false, userDB: user[0]})
                });
            }
        })
    }
}

exports.inventory_create_get = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                res.render('admin_salesman/inventory/add', {title: 'Agregar producto', errors:[], success:false, userDB: user[0]});
            }
        })
    }
}

exports.inventory_create_post = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                let errors = Validators.validateAddProduct(req.body.nombre, req.body.tipo, req.body.talla, req.body.genero, req.body.precio, req.body.cantidad, req.body.descripcion)
                if(errors.length > 0){
                    res.render('admin_salesman/inventory/add', {title: 'Agregar producto', errors:errors, success:false, userDB: user[0]});
                }else{
                    Inventario.insertProducts({ nombre: req.body.nombre, tipo: req.body.tipo, genero: req.body.genero, precio: req.body.precio, descripcion: req.body.descripcion})
                    .then((data) => {
                        Inventario.insertInventory({id_producto: data[0], cantidad: parseInt(req.body.cantidad), talla: req.body.talla})
                        .then((data2) =>{
                            res.render('admin_salesman/inventory/add', {title: 'Agregar producto', errors:errors, success:true, userDB: user[0]});
                        });
                    });
                }
            }
        })
    }
}

exports.inventory_update_get = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                Inventario.findByIdInInventory(req.params.id)
                .then((data) => {
                    let selectedTalla = 0
                    if (data[0].talla == 'NoAplica'){
                        selectedTalla = 1
                    } else if (data[0].talla == 'XCH'){
                        selectedTalla = 2
                    } else if (data[0].talla == 'CH'){
                        selectedTalla = 3
                    } else if (data[0].talla == 'M'){
                        selectedTalla = 4
                    } else if (data[0].talla == 'G'){
                        selectedTalla = 5
                    } else if (data[0].talla == 'XG'){
                        selectedTalla = 6
                    }
                    
                    Inventario.findByIdInProducts(data[0].id_producto)
                    .then((data2) => {
                        res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2, selectedTalla:selectedTalla, errors:[], success: false, userDB: user[0]});
                    })
                });
            }
        })
    }
}

exports.inventory_update_post = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                Inventario.findByIdInInventory(req.params.id)
                .then((data) => {
                    if (data == null) {
                        // Regresa el error 404
                        res.status(404).send('Not found');
                        return;
                    }
                    let errors = Validators.validateEditInventoryProduct(req.body.cantidad)
                    let updateDataInventario = {
                        id_producto: data.id_producto,
                        cantidad: req.body.cantidad,
                        talla: req.body.talla
                    }
                    Inventario.findByIdInInventory(req.params.id)
                    .then((data) => {
                        let selectedTalla = 0
                        if (data[0].talla == 'NoAplica'){
                            selectedTalla = 1
                        } else if (data[0].talla == 'XCH'){
                            selectedTalla = 2
                        } else if (data[0].talla == 'CH'){
                            selectedTalla = 3
                        } else if (data[0].talla == 'M'){
                            selectedTalla = 4
                        } else if (data[0].talla == 'G'){
                            selectedTalla = 5
                        } else if (data[0].talla == 'XG'){
                            selectedTalla = 6
                        }
                        Inventario.findByIdInProducts(data[0].id_producto)
                        .then((data2) => {
                            if (errors.length > 0){
                                res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2, selectedTalla:selectedTalla, errors:errors, success: false, userDB: user[0]});
                            }else{
                                Inventario.updateInventario(req.params.id, updateDataInventario)
                                .then((dataUseless) =>{
                                    console.log(data[0])
                                    res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2, selectedTalla:selectedTalla, errors:errors, success: true, userDB: user[0]});
                                })
                                
                            }
                            
                        })
                    });
                    
                });
            }
        })
    }
}



exports.products_delete_products_post = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                let id_producto = req.params.id
                Inventario.deleteProductosFromInventario(id_producto)
                .then ((dataEmpty) => {
                    Ventas.allSalesOfAProduct(id_producto)
                    .then((data) => {
                        for(let i = 0; i < data.length; i++){
                            Ventas.updateSale(data[i].id, {id_ticket: data[i].id_ticket, id_producto: 1})
                            .then((empty) =>{
                                if(i == data.length-1){
                                    Inventario.deleteProducto(id_producto)
                                    .then((dataEmpty) =>{
                                        // Aquí se acaba
                                        Inventario.allProducts()
                                        .then((data) =>{
                                            res.render('admin_salesman/inventory/allProducts', {title: 'Administrar productos', data: data, success:true, userDB: user[0]})
                                        });
                                    })
                                }
                            })
                        }
                    })
                })
            }
        })
    }
}


exports.productos_update_get = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                Inventario.findByIdInProducts(req.params.id)
                .then((data) => {
                    let selectedType = 0
                    let selectedGenero = 0
                    if (data.tipo == 'short'){
                        selectedType = 1
                    } else if (data.tipo == 'playera'){
                        selectedType = 2
                    } else if (data.tipo == 'pantalon'){
                        selectedType = 3
                    } else if (data.tipo == 'accesorio'){
                        selectedType = 4
                    }
                    if(data.genero == 'H'){
                        selectedGenero = 1
                    }else if(data.genero == 'M'){
                        selectedGenero = 2
                    }
                    res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data, selectedType:selectedType, selectedGenero:selectedGenero, errors:[], success: false, userDB: user[0]});
                });
            }
        })
    }
}

exports.productos_update_post = function(req, res){
    if(!req.oidc.isAuthenticated()){
        res.render('admin_salesman/error', {title: 'Acceso denegado', err:1});
    }
    else if(!req.oidc.user.email_verified){
        res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
    }else{
        Usuarios.getUserByEmail(req.oidc.user.email)
        .then((user) =>{
            if(user.length == 0){
                res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
            }else if(user[0].rol == 'cajero'){
                res.render('admin_salesman/error', {title: 'Acceso denegado', err:4});
            }else{
                let errors = Validators.validateEditProductsProduct(req.body.precio, req.body.nombre, req.body.descripcion)
                let updateDataProducto = {
                    nombre: req.body.nombre,
                    precio: req.body.precio,
                    tipo: req.body.tipo,
                    genero: req.body.genero,
                    descripcion: req.body.descripcion
                }
                Inventario.findByIdInProducts(req.params.id)
                .then((data) => {
                    if(errors.length > 0){
                        let selectedType = 0
                        let selectedGenero = 0
                        if (data.tipo == 'short'){
                            selectedType = 1
                        } else if (data.tipo == 'playera'){
                            selectedType = 2
                        } else if (data.tipo == 'pantalon'){
                            selectedType = 3
                        } else if (data.tipo == 'accesorio'){
                            selectedType = 4
                        }
                        if(data.genero == 'H'){
                            selectedGenero = 1
                        }else if(data.genero == 'M'){
                            selectedGenero = 2
                        }
                        res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data, errors:errors, selectedType:selectedType, selectedGenero:selectedGenero, success: false, userDB: user[0]});
                    }else{
                        Inventario.updateProducto(req.params.id, updateDataProducto)
                        .then((data2) => {
                            Inventario.findByIdInProducts(req.params.id)
                            .then((data) => {
                                let selectedType = 0
                                let selectedGenero = 0
                                if (data.tipo == 'short'){
                                    selectedType = 1
                                } else if (data.tipo == 'playera'){
                                    selectedType = 2
                                } else if (data.tipo == 'pantalon'){
                                    selectedType = 3
                                } else if (data.tipo == 'accesorio'){
                                    selectedType = 4
                                }
                                if(data.genero == 'H'){
                                    selectedGenero = 1
                                }else if(data.genero == 'M'){
                                    selectedGenero = 2
                                }
                                res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data, errors:errors, selectedType:selectedType, selectedGenero:selectedGenero, success: true, userDB: user[0]});
                            });
                        });
                    }
                });
                
            }
        })
    }
}