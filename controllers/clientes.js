let Productos = require('../models/productos')
let Inventario = require('../models/inventario')

exports.men_products = (req, res) => {
    Productos.menProducts()
    .then((data) => {
        console.log(data)
        res.render('clientes/hombre', {title: 'Ropa para hombre', data: data})
    });
}

exports.menProductDetail = (req, res) => {
    idProduct = req.params.id
    Inventario.findByIdInProducts(idProduct)
    .then((dataProduct) => {
        Inventario.findByIdInInventoryndProducts(idProduct)
        .then((dataInventario) => {
            console.log(dataInventario)
            res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario})
        })
        
    })
}

exports.women_products = (req, res) => {
    Productos.womenProducts()
    .then((data) => {
        console.log(data)
        res.render('clientes/mujer', {title: 'Ropa para mujer', data: data})
    });
}

exports.womenProductDetail = (req, res) => {
    idProduct = req.params.id
    Inventario.findByIdInProducts(idProduct)
    .then((dataProduct) => {
        Inventario.findByIdInInventoryndProducts(idProduct)
        .then((dataInventario) => {
            console.log(dataInventario)
            res.render('clientes/productDetail', {title: dataProduct.nombre, dataProduct: dataProduct, dataInventario: dataInventario})
        })
        
    })
}