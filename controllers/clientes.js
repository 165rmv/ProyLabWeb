let Productos = require('../models/productos')
let Inventario = require('../models/inventario')
let Usuarios = require('../models/usuarios');
const CurrConverter = require('currency-converter-lt')
let currencyConverter = new CurrConverter();

const admin = require('firebase-admin');

const db = admin.database();

exports.homePage = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            res.redirect('admin_salesman/inventory');
                        });
                    }
                })
                
            }
        })
    }else{
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            db.ref('img').child('index').once('value', (snapshot2) =>{
                const entradasIndex = snapshot2.val()
                res.render('clientes/index', { title: 'Aesthetic Fashion', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC, imgs:entradasIndex });
            })
            
        });
        
    }
    
}

exports.aboutUs = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            
                        });
                    }
                })
                
            }
        })
    }else{
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            res.render('clientes/aboutUs', {title: 'Quiénes somos', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC});
        });
        
    }
    
}

exports.visitUs = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            
                        });
                    }
                })
                
            }
        })
    }else{
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            res.render('clientes/visitUs', {title: '¡Visita nuestras sucursales!', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC});
        })
        
    }
    
}

exports.men_products = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC: entradas.logoC});
                            });
                        });
                    }
                })
                
            }
        })
    }else{
        Productos.menProducts()
        .then((data) => {
            Usuarios.getCurrency()
            .then((curr) => {
                let selectedCur = 0
                let currSign = '$'
                if (curr.currency == "EUR"){
                    currSign = '€'
                    selectedCur = 1
                }else if (curr.currency == "MXN"){
                    selectedCur = 2
                }else if (curr.currency == "USD"){
                    selectedCur = 3
                }else if (curr.currency == "CLP"){
                    selectedCur = 4
                }else if (curr.currency == "ARS"){
                    selectedCur = 5
                }
                if(curr.currency != "MXN"){
                    currencyConverter.from("MXN").to(curr.currency).amount(1).convert().then((response) => {
                        for(let i = 0; i<data.length; i++){
                            data[i].precio *=  response
                            data[i].precio = data[i].precio.toFixed(2)
                        }
                        db.ref('img').child('assets').once('value', (snapshot) =>{
                            const entradas = snapshot.val();
                            res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                        });
                        
                    })
                }else{
                    db.ref('img').child('assets').once('value', (snapshot) =>{
                        const entradas = snapshot.val();
                        res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                    });
                }
                
            });
        });
    }
}

exports.men_productsPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            })
                        });
                    }
                })
                
            }
        })
    }else{
        Usuarios.firsUser()
        .then((user) => {
            Usuarios.setCurrency({nombre: user.nombre, apellido: user.apellido, rol: user.rol, currency: req.body.currencySelect, email: user.email, password: user.password})
            .then((nothing) => {
                Productos.menProducts()
                .then((data) => {
                    Usuarios.getCurrency()
                    .then((curr) => {
                        
                        let selectedCur = 0
                        let currSign = '$'
                        if (curr.currency == "EUR"){
                            currSign = '€'
                            selectedCur = 1
                        }else if (curr.currency == "MXN"){
                            selectedCur = 2
                        }else if (curr.currency == "USD"){
                            selectedCur = 3
                        }else if (curr.currency == "CLP"){
                            selectedCur = 4
                        }else if (curr.currency == "ARS"){
                            selectedCur = 5
                        }
                        if(curr.currency != "MXN"){
                            currencyConverter.from("MXN").to(curr.currency).amount(1).convert().then((response) => {
                                for(let i = 0; i<data.length; i++){
                                    data[i].precio *=  response
                                    data[i].precio = data[i].precio.toFixed(2)
                                }
                                db.ref('img').child('assets').once('value', (snapshot) =>{
                                    const entradas = snapshot.val();
                                    res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                                })
                            })
                        }else{
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                            });
                        }
                    });
                });
            })
        })
    }
}


exports.productDetail = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            })
                        });
                    }
                })
                
            }
        })
    }else{
        idProduct = req.params.id
        Inventario.findByIdInProducts(idProduct)
        .then((dataProduct) => {
            Inventario.findByIdInInventoryndProducts(idProduct)
            .then((dataInventario) => {
                Usuarios.getCurrency()
                .then((curr) => {
                    let selectedCur = 0
                    let currSign = '$'
                    if (curr.currency == "EUR"){
                        currSign = '€'
                        selectedCur = 1
                    }else if (curr.currency == "MXN"){
                        selectedCur = 2
                    }else if (curr.currency == "USD"){
                        selectedCur = 3
                    }else if (curr.currency == "CLP"){
                        selectedCur = 4
                    }else if (curr.currency == "ARS"){
                        selectedCur = 5
                    }
                    if(curr.currency != "MXN"){
                        currencyConverter.from("MXN").to(curr.currency).amount(1).convert()
                        .then((response) => {
                            dataProduct[0].precio *=  response
                            dataProduct[0].precio = dataProduct[0].precio.toFixed(2)
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('clientes/productDetail', {title: dataProduct[0].nombre, dataProduct: dataProduct[0], dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                            });
                        })
                    }else{
                        db.ref('img').child('assets').once('value', (snapshot) =>{
                            const entradas = snapshot.val();
                            res.render('clientes/productDetail', {title: dataProduct[0].nombre, dataProduct: dataProduct[0], dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                        });
                    }
                    
                });
                    
            })
            
        })
    }
}

exports.productDetailPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            });
                        });
                    }
                })
                
            }
        })
    }else{
        Usuarios.firsUser()
        .then((user) => {
            Usuarios.setCurrency({nombre: user.nombre, apellido: user.apellido, rol: user.rol, currency: req.body.currencySelect, email: user.email, password: user.password})
            .then((nothing) => {
                idProduct = req.params.id
                Inventario.findByIdInProducts(idProduct)
                .then((dataProduct) => {
                    Inventario.findByIdInInventoryndProducts(idProduct)
                    .then((dataInventario) => {
                        Usuarios.getCurrency()
                        .then((curr) => {
                            let selectedCur = 0
                            let currSign = '$'
                            if (curr.currency == "EUR"){
                                currSign = '€'
                                selectedCur = 1
                            }else if (curr.currency == "MXN"){
                                selectedCur = 2
                            }else if (curr.currency == "USD"){
                                selectedCur = 3
                            }else if (curr.currency == "CLP"){
                                selectedCur = 4
                            }else if (curr.currency == "ARS"){
                                selectedCur = 5
                            }
                            if(curr.currency != "MXN"){
                                currencyConverter.from("MXN").to(curr.currency).amount(1).convert().then((response) => {
                                    dataProduct[0].precio *=  response
                                    dataProduct[0].precio = dataProduct[0].precio.toFixed(2)
                                    db.ref('img').child('assets').once('value', (snapshot) =>{
                                        const entradas = snapshot.val();
                                        res.render('clientes/productDetail', {title: dataProduct[0].nombre, dataProduct: dataProduct[0], dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                                    });
                                })
                            }else{
                                db.ref('img').child('assets').once('value', (snapshot) =>{
                                    const entradas = snapshot.val();
                                    res.render('clientes/productDetail', {title: dataProduct[0].nombre, dataProduct: dataProduct[0], dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                                });
                            }
                            
                        });
                    })
                    
                })
                    
            })
        })
    }
}

exports.women_products = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            });
                        });
                    }
                })
                
            }
        })
    }else{
        Productos.womenProducts()
        .then((data) => {
            Usuarios.getCurrency()
            .then((curr) => {
                let selectedCur = 0
                let currSign = '$'
                if (curr.currency == "EUR"){
                    currSign = '€'
                    selectedCur = 1
                }else if (curr.currency == "MXN"){
                    selectedCur = 2
                }else if (curr.currency == "USD"){
                    selectedCur = 3
                }else if (curr.currency == "CLP"){
                    selectedCur = 4
                }else if (curr.currency == "ARS"){
                    selectedCur = 5
                }
                if(curr.currency != "MXN"){
                    currencyConverter.from("MXN").to(curr.currency).amount(1).convert().then((response) => {
                        for(let i = 0; i<data.length; i++){
                            data[i].precio *=  response
                            data[i].precio = data[i].precio.toFixed(2)
                        }
                        db.ref('img').child('assets').once('value', (snapshot) =>{
                            const entradas = snapshot.val();
                            res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                        });
                    })
                }else{
                    db.ref('img').child('assets').once('value', (snapshot) =>{
                        const entradas = snapshot.val();
                        res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                    });
                }
            });
        });
    }
}

exports.women_productsPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        db.ref('img').child('assets').once('value', (snapshot) =>{
            const entradas = snapshot.val();
            if(!req.oidc.user.email_verified){
                res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
            }else{
                Usuarios.getUserByEmail(req.oidc.user.email)
                .then((user) =>{
                    if(user.length == 0){
                        res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                    }else{
                        Inventario.allInventory()
                        .then((data) => {
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user, logoC:entradas.logoC});
                            });
                        });
                    }
                })
                
            }
        })
    }else{
        Usuarios.firsUser()
        .then((user) => {
            Usuarios.setCurrency({nombre: user.nombre, apellido: user.apellido, rol: user.rol, currency: req.body.currencySelect, email: user.email, password: user.password})
            .then((nothing) => {
                Productos.womenProducts()
                .then((data) => {
                    Usuarios.getCurrency()
                    .then((curr) => {
                        let selectedCur = 0
                        let currSign = '$'
                        if (curr.currency == "EUR"){
                            currSign = '€'
                            selectedCur = 1
                        }else if (curr.currency == "MXN"){
                            selectedCur = 2
                        }else if (curr.currency == "USD"){
                            selectedCur = 3
                        }else if (curr.currency == "CLP"){
                            selectedCur = 4
                        }else if (curr.currency == "ARS"){
                            selectedCur = 5
                        }
                        if(curr.currency != "MXN"){
                            currencyConverter.from("MXN").to(curr.currency).amount(1).convert().then((response) => {
                                for(let i = 0; i<data.length; i++){
                                    data[i].precio *=  response
                                    data[i].precio = data[i].precio.toFixed(2)
                                }
                                db.ref('img').child('assets').once('value', (snapshot) =>{
                                    const entradas = snapshot.val();
                                    res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                                });
                            })
                        }else{
                            db.ref('img').child('assets').once('value', (snapshot) =>{
                                const entradas = snapshot.val();
                                res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user, logoC:entradas.logoC})
                            });
                        }
                    });
                });
            })
        })
    }
}