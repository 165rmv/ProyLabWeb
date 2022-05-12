let Inventario = require('../../models/inventario');

exports.inventario_list = function(req, res){
    Inventario.allInventory()
        .then((data) => {
            res.status(200).json({
                inventario: data
            })
        });
}
