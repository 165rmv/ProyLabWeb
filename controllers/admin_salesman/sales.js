let Ventas = require('../../models/sales')
let Inventario = require('../../models/inventario')
let Usuarios = require('../../models/usuarios')
let Tickets = require('../../models/tickets');

let alert = require('alert');

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

exports.makeASale = (req, res) => {
    let id_usuario = req.body.selectUsuarios;
    let id_inventario = req.body.id;

    console.log(`id Inventario: ${id_inventario}`)

    Inventario.findByIdInInventory(id_inventario)
    .then((data) => {
        if (data == null) {
            // Regresa el error 404
            res.status(404).send('Not found');
            return;
        }
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
                    Tickets.insertTicket(data3.precio, id_usuario)
                    .then((data4) => {
                        Tickets.getLastTicket()
                        .then((data5) => {
                            Ventas.insertSale(data5.id, data[0].id_producto)
                            .then((data6) =>{
                                res.render('admin_salesman/sales', {title: 'Ventas', data: sales})
                            });
                        });
                    });
                });
            });
        })
    });
}