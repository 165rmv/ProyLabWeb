let Ventas = require('../../models/sales');
let Inventario = require('../../models/inventario');
let Usuarios = require('../../models/usuarios');
let Tickets = require('../../models/tickets');
let Validator = require('../../validators/AuthValidator');

const admin = require('firebase-admin');

const db = admin.database();

exports.sales_list = (req, res) =>{
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
                    Ventas.all()
                    .then((data) => {
                        res.render('admin_salesman/sales/index', {title: 'Ventas', data: data, userDB: user[0], logoC:entradas.logoC});
                        
                    });
                }
            })
        }
    })
}

exports.details_sale = (req, res) => {
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
                    idTicket = req.params.id
                    Ventas.list_products_sold(idTicket)
                    .then((list_sold) =>{
                        Ventas.time_stamp(idTicket)
                        .then((timeStamp) => {
                            Ventas.vendor_ticket(idTicket)
                            .then((vendor) =>{
                                res.render('admin_salesman/sales/details', {idTicket: req.params.id, list_sold: list_sold, timeStamp: timeStamp, vendor: vendor, userDB: user[0], logoC:entradas.logoC})
                                
                            });
                        });
                    });
                }
            })
        }
    })
}

exports.salesman_list = (req, res) => {
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
                }else if(user[0].rol != 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    Usuarios.allSalesman()
                    .then((data) => {
                        res.render('admin_salesman/sales/add', {title: 'Agregar una venta', data: data, errors:[], userDB: user[0], logoC:entradas.logoC, success: false})
                        
                    })
                }
            })
        }
    })
}

exports.makeASale = (req, res) => {
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
                }else if(user[0].rol != 'cajero'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    let errors = Validator.validateAddSale(req.body.id)
                    if(errors.length > 0){
                        Usuarios.allSalesman()
                        .then((data) => {
                            res.render('admin_salesman/sales/add', {title: 'Agregar una venta', data: data, errors:errors, userDB: user[0], logoC:entradas.logoC, success: false})
                            
                        })
                    }else{
                        let id_usuario = req.body.selectUsuarios;
                        let id_inventario = req.body.id;
                        
                        Inventario.findByIdInInventory(id_inventario)
                        .then((data) => {
                            if (data.length == 0) {
                                // Regresa el error 404
                                errors.push({'param':'No encontrado', 'msg':'No se ha encontrado el artículo ingresado, por favor inténtelo de nuevo.'})
                                Usuarios.allSalesman()
                                .then((data) => {
                                    res.render('admin_salesman/sales/add', {title: 'Agregar una venta', data: data, errors:errors, userDB: user[0], logoC:entradas.logoC, success: false})
                                    
                                })
                            }else{
                                let updateDataInventario = {
                                    id_producto: data[0].id_producto,
                                    cantidad: data[0].cantidad-1,
                                    talla: data[0].talla
                                }
                                Inventario.updateInventario(id_inventario, updateDataInventario)
                                .then((data2) => {
                                    Ventas.all()
                                    .then((sales) => {
                                        Inventario.findByIdInProducts(data[0].id_producto)
                                        .then((data3) => {
                                            Tickets.insertTicket(data3[0].precio, id_usuario)
                                            .then((data4) => {
                                                Tickets.getLastTicket()
                                                .then((data5) => {
                                                    Ventas.insertSale(data5.id, data[0].id_producto)
                                                    .then((data6) =>{
                                                        Usuarios.allSalesman()
                                                        .then((data) => {
                                                            res.render('admin_salesman/sales/add', {title: 'Agregar una venta', data: data, errors:errors, userDB: user[0], logoC:entradas.logoC, success: true})
                                                            
                                                        })
                                                    });
                                                });
                                            });
                                        });
                                    });
                                })
                            }
                            
                        });
                    }
                }
            })
        }
    })
}