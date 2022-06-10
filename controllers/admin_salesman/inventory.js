let Inventario = require('../../models/inventario')
let Usuarios = require('../../models/usuarios')
let Validators = require('../../validators/AuthValidator')
let Ventas = require('../../models/sales')
let path = require('path')
const {Storage} = require('@google-cloud/storage');
let fs = require('fs');

let bucketName = "assets"

const admin = require('firebase-admin');
const { storage } = require('firebase-admin');

const db = admin.database();

exports.inventory_list = (req, res) =>{
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, userDB: user[0], success: false, successMsg:'', logoC:entradas.logoC});
                        
                    });
                }
            })
        }
    })
}

exports.productos_list = (req, res) =>{
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else{
                    Inventario.allProducts()
                    .then((data) =>{
                        res.render('admin_salesman/inventory/allProducts', {title: 'Mostrar productos', data: data, success:false, userDB: user[0], logoC:entradas.logoC})
                        
                    });
                }
            })
        }
    })
}

exports.inventory_create_get = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    res.render('admin_salesman/inventory/add', {title: 'Agregar producto al inventario', errors:[], success:false, userDB: user[0], logoC:entradas.logoC});
                    
                }
            })
        }
    })
}

exports.inventory_create_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let errors = Validators.validateAddProductInventario(req.body.id, req.body.cantidad)
                    if(errors.length > 0){
                        res.render('admin_salesman/inventory/add', {title: 'Agregar producto al inventario', errors:errors, success:false, userDB: user[0], logoC:entradas.logoC});
                        
                    }else{
                        Inventario.findByIdInProducts(req.body.id)
                        .then((producto) =>{
                            if(producto.length == 0){
                                errors.push({'param':'No encontrado', 'msg':'El id del producto no se encuentra dentro de la base de datos.'})
                                
                                res.render('admin_salesman/inventory/add', {title: 'Agregar producto al inventario', errors:errors, success:false, userDB: user[0], logoC:entradas.logoC});
                                
                            }else{
                                Inventario.insertInventory({id_producto: req.body.id, cantidad: parseInt(req.body.cantidad), talla: req.body.talla})
                                .then((data2) =>{
                                    res.render('admin_salesman/inventory/add', {title: 'Agregar producto al inventario', errors:errors, success:true, userDB: user[0], logoC:entradas.logoC});
                                    
                                });
                            }
                        })
                        
                    }
                }
            })
        }
    })
}

exports.product_create_get = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                        res.render('admin_salesman/inventory/addProduct', {title: 'Agregar producto a la base de datos', errors:[], success:false, userDB: user[0], logoC:entradas.logoC});
                    
                }
            })
        }
    })
}

exports.product_create_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let errors = Validators.validateAddProductProducts(req.body.nombre, req.body.precio, req.body.descripcion)
                    if(errors.length > 0){
                        res.render('admin_salesman/inventory/addProduct', {title: 'Agregar producto a la base de datos', errors:errors, success:false, userDB: user[0], logoC:entradas.logoC});
                        
                    }else{
                        /*fs.readFile('addImage/'+req.body.precio[1], function(err, data) {
                            if (err){
                                errors.push({'param':'Error Imagen', 'msg':err})
                                res.render('admin_salesman/inventory/addProduct', {title: 'Agregar producto a la base de datos', errors:errors, success:false, userDB: user[0], logoC:entradas.logoC});
                                
                            }else{*/
                                /*let pathFile = path.extname('addImage/'+req.body.precio[1])
                                pathFile = pathFile.replace(/\./g,'');
                                console.log(pathFile)
                                const metadata = {
                                    contentType: pathFile,
                                }

                                db.ref("img").child("assets").push({data, metadata})*/
                                
                                
                                //db.ref('imgs').push(file ,metadata)
                                //res.end(data);
                                /*
                                storage.bucket(bucketName).upload(`addImage/${req.body.precio[1]}`, {
                                    gzip: true,
                                    metadata: {
                                        cacheControl: 'public, max-age=31536000',
                                    },
                                })*/
                                //db.ref('entradas').push({img: data})
                                Inventario.insertProducts({ nombre: req.body.nombre, tipo: req.body.tipo, genero: req.body.genero, precio: req.body.precio, descripcion: req.body.descripcion, img: "https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/assets%2Fsquare.png?alt=media&token=90d98ad9-06df-434e-aaaf-c39878af69a9"})
                                .then((data) => {
                                    res.render('admin_salesman/inventory/addProduct', {title: 'Agregar producto a la base de datos', errors:errors, success:true, userDB: user[0], logoC:entradas.logoC});
                                    
                                });
                            //}
                            
                        //});

                        /*Inventario.insertProducts({ nombre: req.body.nombre, tipo: req.body.tipo, genero: req.body.genero, precio: req.body.precio[0], descripcion: req.body.descripcion, img: "https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/assets%2Fsquare.png?alt=media&token=90d98ad9-06df-434e-aaaf-c39878af69a9"})
                        .then((data) => {
                            res.render('admin_salesman/inventory/addProduct', {title: 'Agregar producto a la base de datos', errors:errors, success:true, userDB: user[0], logoC:entradas.logoC});
                            
                        });*/
                        
                    }
                }
            })
        }
    })
}

exports.inventory_update_get = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
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
                            res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2[0], selectedTalla:selectedTalla, errors:[], success: false, userDB: user[0], logoC:entradas.logoC});
                            
                        })
                    });
                }
            })
        }
    })
}

exports.inventory_update_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
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
                                    res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2[0], selectedTalla:selectedTalla, errors:errors, success: false, userDB: user[0], logoC:entradas.logoC});
                                    
                                }else{
                                    Inventario.updateInventario(req.params.id, updateDataInventario)
                                    .then((dataUseless) =>{
                                        Inventario.findByIdInProducts(data[0].id_producto)
                                        .then((data2) => {
                                            Inventario.findByIdInInventory(req.params.id)
                                            .then((data) => {
                                                res.render('admin_salesman/inventory/edit', {title: 'Editar producto del inventario', data: data[0], data2: data2[0], selectedTalla:selectedTalla, errors:errors, success: true, userDB: user[0], logoC:entradas.logoC});
                                            })
                                        })
                                    })
                                    
                                }
                                
                            })
                        });
                        
                    });
                }
            })
        }
    })
}


exports.inventory_delete_product_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let id = req.params.id
                    Inventario.deleteInventario(id)
                    .then ((dataEmpty) => {
                        Inventario.allInventory()
                        .then((data) =>{
                            res.render('admin_salesman/inventory', {title: 'Inventario', data: data, success:true, userDB: user[0], logoC:entradas.logoC})
                            
                        });
                    })
                }
            })
        }
    })
}



exports.products_delete_products_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let id_producto = req.params.id
                    Inventario.deleteProductosFromInventario(id_producto)
                    .then ((dataEmpty) => {
                        Ventas.allSalesOfAProduct(id_producto)
                        .then((data) => {
                            if(data.length > 0){
                                for(let i = 0; i < data.length; i++){
                                    Ventas.updateSale(data[i].id, {id_ticket: data[i].id_ticket, id_producto: 1})
                                    .then((empty) =>{
                                        if(i == data.length-1){
                                            Inventario.deleteProducto(id_producto)
                                            .then((dataEmpty) =>{
                                                // Aquí se acaba
                                                Inventario.allProducts()
                                                .then((data) =>{
                                                    res.render('admin_salesman/inventory/allProducts', {title: 'Mostrar productos', data: data, success:true, userDB: user[0], logoC:entradas.logoC})
                                                    
                                                });
                                            })
                                        }
                                    })
                                }
                            }else{
                                Inventario.deleteProducto(id_producto)
                                .then((dataEmpty) =>{
                                    // Aquí se acaba
                                    Inventario.allProducts()
                                    .then((data) =>{
                                        res.render('admin_salesman/inventory/allProducts', {title: 'Mostrar productos', data: data, success:true, userDB: user[0], logoC:entradas.logoC})
                                        
                                    });
                                })
                            }
                        })
                    })
                }
            })
        }
    })
}


exports.productos_update_get = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    Inventario.findByIdInProducts(req.params.id)
                    .then((data) => {
                        let selectedType = 0
                        let selectedGenero = 0
                        if (data[0].tipo == 'short'){
                            selectedType = 1
                        } else if (data[0].tipo == 'playera'){
                            selectedType = 2
                        } else if (data[0].tipo == 'pantalon'){
                            selectedType = 3
                        } else if (data[0].tipo == 'accesorio'){
                            selectedType = 4
                        }
                        if(data[0].genero == 'H'){
                            selectedGenero = 1
                        }else if(data[0].genero == 'M'){
                            selectedGenero = 2
                        }
                        res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data[0], selectedType:selectedType, selectedGenero:selectedGenero, errors:[], success: false, userDB: user[0], logoC:entradas.logoC});
                        
                    });
                }
            })
        }
    })
}

exports.productos_update_post = function(req, res){
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado', err:1, logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol == 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let errors = Validators.validateEditProductsProduct(req.body.precio, req.body.nombre, req.body.descripcion)
                    let updateDataProducto = {
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        tipo: req.body.tipo,
                        genero: req.body.genero,
                        descripcion: req.body.descripcion,
                        img: "https://firebasestorage.googleapis.com/v0/b/aesthetic-fashion-4a9dd.appspot.com/o/assets%2Fsquare.png?alt=media&token=90d98ad9-06df-434e-aaaf-c39878af69a9"
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
                            res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data[0], errors:errors, selectedType:selectedType, selectedGenero:selectedGenero, success: false, userDB: user[0], logoC:entradas.logoC});
                            
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
                                    res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data[0], errors:errors, selectedType:selectedType, selectedGenero:selectedGenero, success: true, userDB: user[0], logoC:entradas.logoC});
                                    
                                });
                            });
                        }
                    });
                    
                }
            })
        }
    })
}