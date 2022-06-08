var express = require('express');
var router = express.Router();

let usuariosController = require('../../controllers/admin_salesman/users')
let authValidator = require('../../validators/AuthValidator')

router.get('/', usuariosController.users_list);

router.get('/add', usuariosController.addUser_render);

router.post('/add', usuariosController.insert_user);

router.post('/:id/delete', usuariosController.delete_user);

module.exports = router;