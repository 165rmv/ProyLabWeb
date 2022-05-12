let Inventario = require('../../models/inventario')

exports.inventory_list = (req, res) =>{
    Inventario.allInventory()
        .then((data) => {
            res.render('admin_salesman/inventory/index', {title: 'Inventario', data: data});
        });
    
}

exports.productos_list = (req, res) =>{
    Inventario.allProducts()
        .then((data) =>{
            res.render('admin_salesman/inventory/allProducts', {title: 'Administrar productos', data: data})
        });
}

exports.inventory_create_get = function(req, res){
    res.render('admin_salesman/inventory/add', {title: 'Agregar producto'});
}

exports.inventory_create_post = function(req, res){
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si los hubieron entonces regresa a la petición anterior
      return res.status(422).json({ errors: errors.array() });
    }*/
    
    Inventario.insertProducts({ nombre: req.body.nombre, tipo: req.body.tipo, genero: req.body.genero, precio: req.body.precio, descripcion: req.body.descripcion})
    .then((data) => {
        Inventario.insertInventory({id_producto: data[0], cantidad: parseInt(req.body.cantidad), talla: req.body.talla})
        .then((data2) =>{
            res.redirect('/admin_salesman/inventory')
        });
    });
}

exports.inventory_update_get = function(req, res){
    Inventario.findByIdInInventory(req.params.id)
    .then((data) => {
        console.log(data[0].id_producto)
        Inventario.findByIdInProducts(data[0].id_producto)
        .then((data2) => {
            res.render('admin_salesman/inventory/edit', {title: 'Editar producto', data: data[0], data2: data2});
        })
        
    });
}

exports.inventory_update_post = function(req, res){
    Inventario.findByIdInInventory(req.params.id)
    .then((data) => {
        if (data == null) {
            // Regresa el error 404
            res.status(404).send('Not found');
            return;
        }
        let updateDataInventario = {
            id_producto: data.id_producto,
            cantidad: req.body.cantidad,
            talla: req.body.talla
        }
        Inventario.updateInventario(req.params.id, updateDataInventario)
        .then((data2) => {
            res.redirect('/admin_salesman/inventory');
        });
    });
}

exports.inventory_delete_inventory_post = function(req, res){
    Inventario.deleteInventario(req.params.id)
    .then((data) => {
        res.redirect('/admin_salesman/inventory');
    });
}

exports.products_delete_products_post = function(req, res){
    Inventario.deleteProducto(req.params.id)
    .then((data) => {
        res.redirect('/admin_salesman/inventory/allProducts');
    });
}


exports.productos_update_get = function(req, res){
    Inventario.findByIdInProducts(req.params.id)
    .then((data) => {
        res.render('admin_salesman/inventory/editProduct', {title: 'Editar producto', data: data});
    });
}

exports.productos_update_post = function(req, res){
    let updateDataProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        tipo: req.body.tipo,
        genero: req.body.genero,
        descripcion: req.body.descripcion
    }
    Inventario.updateProducto(req.params.id, updateDataProducto)
    .then((data) => {
        res.redirect('/admin_salesman/inventory/allProducts');
    });
}