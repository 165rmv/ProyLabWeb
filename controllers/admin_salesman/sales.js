let Ventas = require('../../models/sales')

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
