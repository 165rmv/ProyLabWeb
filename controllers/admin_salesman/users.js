let Usuarios = require('../../models/usuarios');
let Tickets = require('../../models/tickets');
const bcrypt = require('bcryptjs')

//const { validationResult } = require('express-validator');

exports.users_list = (req, res) => {
    Usuarios.allUsers()
    .then((data) => {
        res.render('admin_salesman/users/index', { title: 'Control de Usuarios', data: data});
    })
}

exports.addUser_render = (req, res) => {
    res.render('admin_salesman/users/add', {
        /*layout: 'auth',
        errors: req.flash('errors'),*/
        title: 'Crear usuario'
    });
}

exports.insert_user = (req, res) => {
    /*
    console.log(`req.body.nombre = ${req.body.name}`)
    let errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        return res.redirect('back');
    }*/

    nombre = req.body.nombre;
    apellido = req.body.apellido;
    mail = req.body.mail;
    rol = req.body.rol;
    password = req.body.password;   

    password = bcrypt.hashSync(password, 10)
    Usuarios.insertUser(nombre, apellido, rol, mail, password)
    .then((data) => {
        res.render('admin_salesman/users/add', { title: 'Crear usuario' });
    })
    //.catch((error) => console.log(error));

}

exports.delete_user = (req, res) => {
    id = req.params.id
    Tickets.getTicketsByUserId(id)
    .then((list) => {
        for(let ticket of list){
            Tickets.updateTicket(ticket.id, {total: ticket.total, id_usuario: 1})
            .then((empty) => {
                console.log("")
            })
        }
        Usuarios.deleteUser(id)
        .then((empty) => {
            Usuarios.allUsers()
            .then((data) => {
                res.render('admin_salesman/users/index', { title: 'Control de Usuarios', data: data});
            })
        })
    })
}