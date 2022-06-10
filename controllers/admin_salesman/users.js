let Usuarios = require('../../models/usuarios');
let Tickets = require('../../models/tickets');
const bcrypt = require('bcryptjs');
let Validator = require('../../validators/AuthValidator')

const admin = require('firebase-admin');

const db = admin.database();

exports.users_list = (req, res) => {
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado',  err:1 , logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol != 'duenio'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                    Usuarios.allUsers()
                    .then((data) => {
                            res.render('admin_salesman/users/index', { title: 'Control de Usuarios', data: data, success:false, userDB: user[0], logoC:entradas.logoC});
                        
                    })
                }
            })
        }
    })
}

exports.addUser_render = (req, res) => {
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado',  err:1 , logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol != 'duenio'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
                        res.render('admin_salesman/users/add', {title: 'Agregar usuario', errors: [], success: false, userDB: user[0], logoC:entradas.logoC});
                    
                }
            })
        }
    })
}

exports.insert_user = (req, res) => {
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado',  err:1 , logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else{
                    let errors = Validator.validateAddUser(req.body.nombre, req.body.apellido, req.body.mail)

                    if(errors.length > 0){
                            res.render('admin_salesman/users/add', { title: 'Agregar usuario' , errors:errors, success:false, userDB: user[0], logoC:entradas.logoC});
                        
                    }else if(user[0].rol != 'duenio'){
                        res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                    }else{
                        nombre = req.body.nombre;
                        apellido = req.body.apellido;
                        mail = req.body.mail;
                        rol = req.body.rol;
                        password = "EstoNoSeOcupa";   

                        password = bcrypt.hashSync(password, 10)
                        Usuarios.insertUser(nombre, apellido, rol, mail, password)
                        .then((data) => {
                            res.render('admin_salesman/users/add', { title: 'Agregar usuario', errors:[], success: true, userDB: user[0], logoC:entradas.logoC});
                            
                        })
                    }
                    
                }
            })
        }
    })
}

exports.delete_user = (req, res) => {
    db.ref('img').child('assets').once('value', (snapshot) =>{
        const entradas = snapshot.val();
        if(!req.oidc.isAuthenticated()){
            res.render('admin_salesman/error', {title: 'Acceso denegado',  err:1 , logoC:entradas.logoC});
        }
        else if(!req.oidc.user.email_verified){
            res.render('admin_salesman/error', {title: 'Email no verificado', err:2, logoC:entradas.logoC});
        }else{
            Usuarios.getUserByEmail(req.oidc.user.email)
            .then((user) =>{
                if(user.length == 0){
                    res.render('admin_salesman/error', {title: 'Usuario no encontrado', err:3, logoC:entradas.logoC});
                }else if(user[0].rol != 'duenio'){
                    res.render('admin_salesman/error', {title: 'Acceso denegado', err:4, logoC:entradas.logoC});
                }else{
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
                                res.render('admin_salesman/users/index', { title: 'Control de Usuarios', data: data, success: true, userDB: user[0], logoC:entradas.logoC});
                                
                            })
                        })
                    })
                }
            })
        }
    })
}