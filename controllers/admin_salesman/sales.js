let Ventas = require('../../models/sales')
let Inventario = require('../../models/inventario')
let Usuarios = require('../../models/usuarios')

exports.sales_list = (req, res) =>{
    Ventas.all()
        .then((data) => {
            res.render('admin_salesman/sales/index', {title: 'Ventas', data: data});
        });
}

exports.details_sale = (req, res) => {
    idTicket = req.params.id
    Ventas.list_products_sold(idTicket)
    .then((list_sold) =>{
        Ventas.time_stamp(idTicket)
        .then((timeStamp) => {
            Ventas.vendor_ticket(idTicket)
            .then((vendor) =>{
                console.log(timeStamp)
                res.render('admin_salesman/sales/details', {idTicket: req.params.id, list_sold: list_sold, timeStamp: timeStamp, vendor: vendor})
            });
        });
    });
}

exports.salesman_list = (req, res) => {
    Usuarios.allSalesman()
    .then((data) => {
        res.render('admin_salesman/sales/add', {title: 'Agregar una venta', data: data})
    })
}