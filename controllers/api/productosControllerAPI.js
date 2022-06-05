let Productos = require('../../models/productos');

exports.productos_mujer = function(req, res){
    Productos.womenProducts()
        .then((data) => {
            res.status(200).json({
                data: data
            })
        });
}

exports.productos_hombre = function(req, res){
    Productos.menProducts()
        .then((data) => {
            res.status(200).json({
                data: data
            })
        });
}