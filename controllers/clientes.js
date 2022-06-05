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

exports.men_products = (req, res) => {
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
            res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign})
        });
    });
}

exports.men_productsPOST = (req, res) => {
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
                    res.render('clientes/hombre', {title: 'Ropa para hombre', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign})
                });
            });
        })
    })
}


exports.productDetail = (req, res) => {
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
                res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign})
            });
                
        })
        
    })
}

exports.productDetailPOST = (req, res) => {
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
                        res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario, curr: curr, selectedCur: selectedCur, currSign: currSign})
                        
                    });
                })
                
            })
                
        })
    })
}

exports.women_products = (req, res) => {
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
            res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign})
        });
    });
}

exports.women_productsPOST = (req, res) => {
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
                    res.render('clientes/mujer', {title: 'Ropa para mujer', data: data, curr: curr, selectedCur: selectedCur, currSign: currSign})
                });
            });
        })
    })
}