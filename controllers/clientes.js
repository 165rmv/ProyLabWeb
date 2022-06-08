let Productos = require('../models/productos')
let Inventario = require('../models/inventario')
let Currency = require('../public/jsons/currency.json')
let Usuarios = require('../models/usuarios');

function exchangeOne(currency, data){
    let currEx = 0
    switch(currency){
        case 1:
            currEx = Currency[0].EUR
            break;
        case 2:
            currEx = 1
            break;
        case 3:
            currEx = Currency[0].USD
            break;
        case 4:
            currEx = Currency[0].CLP
            break;
        case 5:
            currEx = Currency[0].URY
            break;
    }
    data.precio *=  currEx
    data.precio = data.precio.toFixed(2)
    
    return
}

function exchangefromJson(currency, data){
    let currEx = 0
    switch(currency){
        case 1:
            currEx = Currency[0].EUR
            break;
        case 2:
            currEx = 1
            break;
        case 3:
            currEx = Currency[0].USD
            break;
        case 4:
            currEx = Currency[0].CLP
            break;
        case 5:
            currEx = Currency[0].URY
            break;
    }
    for(let i = 0; i<data.length; i++){
        data[i].precio *=  currEx
        data[i].precio = data[i].precio.toFixed(2)
        console.log(data[i].precio)
    }
    
    return
}

exports.homePage = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.redirect('admin_salesman/inventory');
                    });
                }
            })
            
        }
    }else{
        res.render('clientes/index', { title: 'Aesthetic Fashion', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user });
    }
    
}

exports.aboutUs = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
    }else{
        res.render('clientes/aboutUs', {title: 'Quiénes somos', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user});
    }
    
}

exports.visitUs = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
    }else{
        res.render('clientes/visitUs', {title: '¡Visita nuestras sucursales!', isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user});
    }
    
}

exports.men_products = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                }else if (curr.currency == "URY"){
                    selectedCur = 5
                }
                exchangefromJson(selectedCur, data)
                res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign,isAuthenticated: req.oidc.isAuthenticated()})
            });
        });
    }
}

exports.men_productsPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                        }else if (curr.currency == "URY"){
                            selectedCur = 5
                        }
                        exchangefromJson(selectedCur, data)
                        res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user})
                    });
                });
            })
        })
    }
}


exports.productDetail = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                    }else if (curr.currency == "URY"){
                        selectedCur = 5
                    }
                    exchangeOne(selectedCur, dataProduct)
                    res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user})
                });
                    
            })
            
        })
    }
}

exports.productDetailPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                            }else if (curr.currency == "URY"){
                                selectedCur = 5
                            }
                            exchangeOne(selectedCur, dataProduct)
                            res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user})
                            
                        });
                    })
                    
                })
                    
            })
        })
    }
}

exports.women_products = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                }else if (curr.currency == "URY"){
                    selectedCur = 5
                }
                exchangefromJson(selectedCur, data)
                res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user})
            });
        });
    }
}

exports.women_productsPOST = (req, res) => {
    if(req.oidc.isAuthenticated()){
        if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3});
                }else{
                    Inventario.allInventory()
                    .then((data) => {
                        res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data, userAuth: req.oidc.user});
                    });
                }
            })
            
        }
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
                        }else if (curr.currency == "URY"){
                            selectedCur = 5
                        }
                        exchangefromJson(selectedCur, data)
                        res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign, isAuthenticated: req.oidc.isAuthenticated(), userAuth: req.oidc.user})
                    });
                });
            })
        })
    }
}