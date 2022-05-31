let Tiendas = require('../../models/tiendas')

exports.tiendas_list = function(req, res){
    Tiendas.allStores()
        .then((data) => {
            res.status(200).json({
                tiendas: data
            })
        });
}
