const { check } = require('express-validator');

exports.store = [
    // Revisa que el nombre no sea vacío
    check('nombre').custom((value, {req, loc, path}) => {
        //console.log(req.body)
        if (req.body.nombre == "") {
            throw new Error("No se ha ingresado un nombre.");
        } else {
            return value;
        }
    }),
    // Revisa que el apellido no sea vacío
    check('apellido').notEmpty(),
    // Revisa que el correo sea un mail
    check('mail').isEmail(),
    // Revisa que el password este definido
    check('password').notEmpty(),
    // Revisa que el confirm_password este definido
    check('confirm_password').notEmpty(),
    // Revisa que el password sea el mismo
    check('password').custom((value, {req, loc, path}) => {
        if (value !== req.body.confirm_password) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    })
];
