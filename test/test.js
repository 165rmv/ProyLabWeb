var assert = require('assert');


let Inventario = require('../models/inventario');
let Tickets = require('../models/tickets');
let Ventas = require('../models/sales');
let Usuarios = require('../models/usuarios');
const bcrypt = require('bcryptjs')

const knex = require('../database/connection');
var chai = require('chai');
var chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Pruebas de MochaJS', () => {

    beforeEach((done) => {
        knex.migrate.rollback()
        .then(() => {
            knex.migrate.latest()
            .then(() => {
                return knex.seed.run()
                .then(() => {
                }).then(done, done);
            });
        });
    });

    afterEach((done) => {
        knex.migrate.rollback()
        .then(() => {
        }).then(done, done);
    });

    describe('Inventario.allInventory', () => {
        it('Se obtiene todo el inventario', (done) => {
            Inventario.allInventory()
            .then((data) => {
                expect(data.length).to.equal(18);
            }).then(done, done);
        });
    });

    describe('Inventario.allProducts', () => {
        it('Se obtienen todos los productos de la tabla "productos"', (done) => {
            Inventario.allProducts()
            .then((data) => {
                expect(data.length).to.equal(6);
            }).then(done, done);
        });
    });
    /*
    describe('Inventario.insertProducts e Inventario.insertInventory', () => {
        it('Se agrega un producto nuevo a la tabla de "productos" e "inventario"', (done) => {
            Inventario.insertProducts({ nombre: "Playera rosa", tipo: "Playera", genero: "Unisex", precio: 450.00, descripcion: "Playera facherita"})
            .then((data) => {
                Inventario.insertInventory({id_producto: data[0], cantidad: 15, talla: "Grande"})
                .then((data2) =>{
                    Inventario.allProducts()
                    .then((data3) => {
                        Inventario.allInventory()
                        .then((data4) => {
                            expect(data3.length).to.equal(7);
                            expect(data4.length).to.equal(19);
                        }).then(done, done);
                    });
                });
            });
        });
    });*/

    describe('Inventario.deleteInventario', () => {
        it('Se obtienen se elimina un producto de la tabla "inventario"', (done) => {
            Inventario.deleteInventario(19)
            .then((data) => {
                Inventario.allInventory()
                .then((data2) => {
                    expect(data2.length).to.equal(18);
                }).then(done, done);
            });
        });
    });

    describe('Inventario.updateInventario', () => {
        it('Se agrega un producto a la cantidad de productos disponibles dentro del inventario', (done) =>{
            //let lista = [2, 2, 2, 2];
            let product_id = 1
            Inventario.findByIdInInventory(product_id)
            .then((data) => {
                if (data == null) {
                    // Regresa el error 404
                    res.status(404).send('Not found');
                    return;
                }
                let updateDataInventario = {
                    id_producto: data.id_producto,
                    cantidad: data.cantidad+1,
                    talla: data.talla
                }
                Inventario.updateInventario(product_id, updateDataInventario)
                .then((data2) => {
                    Inventario.findByIdInInventory(product_id)
                    .then((data3) => {
                        expect(data3.cantidad).to.equal(7)
                        expect(data3.id_producto).to.equal(product_id)
                    }).then(done, done);
                });
            });
            done();
        });
    });
    /*
    describe('Tickets.allTickets', () => {
        it('Se obtienen todos los tickets de la tabla "Tickets"', (done) =>{
            Tickets.allTickets()
            .then((data) => {
                expect(data.length).to.equal(6);
            }).then(done, done);
        });
    });*/

    describe('Tickets.insertTicket', () => {
        it('Se agrega un ticket a la tabla "Tickets"', (done) =>{
            Tickets.insertTicket(0.00, 2)
            .then((data) => {
                Tickets.allTickets()
                .then((data2) => {
                    expect(data2.length).to.equal(7);
                }).then(done, done);
            });
        });
    });
    /*
    describe('Tickets.getTicketById', () => {
        it('Se obtiene el ticket por un id', (done) =>{
            let id = 6
            Tickets.getTicketById(id)
            .then((data) => {
                expect(data.id).to.equal(id);
            }).then(done, done);
        });
    });

    describe('Tickets.getLastTicket', () => {
        it('Se obtiene el ultimo ticket agregado', (done) =>{
            Tickets.getLastTicket()
            .then((data) => {
                expect(data.id).to.equal(6);
            }).then(done, done);
        });
    });

    describe('Tickets.updateTicket', () => {
        it('Se actualiza un ticket', (done) =>{
            Tickets.updateTicket(3, {total: 3500.25, id_usuario: 2})
            .then((data) => {
                Tickets.getTicketById(3)
                .then((data2) => {
                    expect(data2.id).to.equal(3);
                    expect(parseFloat(data2.total)).to.equal(3500.25);
                    expect(data2.id_usuario).to.equal(2);
                }).then(done, done);
            });
        });
    });

    describe('Tickets.updateTicket_version2', () => {
        it('Se agrega un ticket y se actualiza despues de ser agregado', (done) =>{
            Tickets.insertTicket(0.00, 1)
            .then((data) => {
                Tickets.getLastTicket()
                .then((data2) => {
                    Tickets.updateTicket(data2.id, {total: 250.00, id_usuario: data2.id_usuario})
                    .then((data3) => {
                        Tickets.getLastTicket()
                        .then((data4) => {
                            expect(data4.id).to.equal(7);
                            expect(parseFloat(data4.total)).to.equal(250.00);
                            expect(data4.id_usuario).to.equal(1);
                        }).then(done, done);
                    });
                });
            });
        });
    });

    describe('Tickets.getProductPriceFromIdInventory', () => {
        it('Se obtiene el precio de un producto con el id de la tabla inventario', (done) =>{
            Inventario.getProductPriceFromIdInventory(6)
            .then((data) => {
                expect(data.id).to.equal(6);
                expect(parseFloat(data.precio)).to.equal(200);
            }).then(done, done);
        });
    });*/
    /*
    describe('Tickets.getProductPriceFromIdInventory_multiple', () => {
        it('Se realiza una venta con una lista de ids del inventario, agregando a la tabla "tickets" y a la tabla "ventas"', (done) =>{
            let total = 0.00;
            let lista = [2, 2, 2, 2];

            Tickets.insertTicket(0.00, 3)
            .then((data) => {
                Tickets.getLastTicket()
                .then((data2) => {
                    Ventas.allSales()
                    .then((data3) => {
                        for(let i = 0; i<lista.length; i++){
                            Ventas.insertSale(data2.id, lista[i])
                            .then((data4) =>{
                                Inventario.getProductPriceFromIdInventory(lista[i])
                                .then((data5) => {
                                    total+=parseFloat(data5.precio);
                                    if(i == lista.length-1){
                                        Tickets.updateTicket(data2.id, {total: total, id_usuario: data2.id_usuario})
                                        .then((data6) => {
                                            Tickets.getLastTicket()
                                            .then((data7) => {
                                                Ventas.allSales()
                                                .then((data8) => {
                                                    expect(data2.id).to.equal(data7.id);
                                                    expect(parseFloat(data7.total)).to.equal(1000);
                                                    expect(parseFloat(data7.id_usuario)).to.equal(3);
                                                    expect(data8.length).to.equal(data3.length+lista.length);
                                                }).then(done, done);
                                            });
                                        });
                                    };
                                });
                            });
                        }
                    });
                });
            });
        });
    });*/

    describe('Inventario.updateInventario, Tickets.insertTicket y Ventas.insertSale', () => {
        it('Se realiza una venta actualizando el inventario, los tickets y las ventas', (done) =>{
            //let lista = [2, 2, 2, 2];
            let inventory_id = 1;
            let user_id = 3;
            Inventario.findByIdInInventory(inventory_id)
            .then((data) => {
                if (data == null) {
                    // Regresa el error 404
                    res.status(404).send('Not found');
                    return;
                }
                let updateDataInventario = {
                    id_producto: data.id_producto,
                    cantidad: data.cantidad-1,
                    talla: data.talla
                }

                Inventario.updateInventario(inventory_id, updateDataInventario)
                .then((data2) => {
                    Ventas.allSales()
                    .then((quantitySales) => {
                        Inventario.findByIdInProducts(data.id_producto)
                        .then((data3) => {
                            Tickets.insertTicket(data3.precio, user_id)
                            .then((data4) => {
                                Tickets.getLastTicket()
                                .then((data5) => {
                                    Ventas.insertSale(data5.id, data.id_producto)
                                    .then((data6) =>{
                                        Ventas.allSales()
                                        .then((data7) => {
                                            Inventario.findByIdInInventory(inventory_id)
                                            .then((data8) => {
                                                expect(data8.cantidad).to.equal(5)
                                                expect(data5.id).to.equal(7)
                                                expect(data5.total).to.equal(data3.precio)
                                                expect(data7.length).to.equal(quantitySales.length+1)

                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
            });
            done();
        });
    });

    describe('Usuarios.insertUser', () => {
        it('Se crea y agrega un usuario nuevo', (done) => {
            nombre = "Juanito";
            apellido = "Banana";
            mail = "juanito_banana@gmail.com";
            rol = "gerente";
            password = "banana4Life";   

            password = bcrypt.hashSync(password, 10)

            Usuarios.insertUser(nombre, apellido, rol, mail, password)
            .then((data) => {
                Usuarios.allUsers()
                .then((data2) => {
                    expect(data2.length).to.equal(6)
                })
            });
            done();
        });
    });

    describe('Usuarios.deleteUser', () => {
        it('Se elimina un usuario', (done) =>{
            Tickets.allTickets()
            .then ((ticketList) => {
                Tickets.getTicketsByUserId(2)
                .then((data) => {
                    let cont = 0
                    for(let ticket of data){
                        cont += 1;
                        Tickets.updateTicket(ticket.id, {total: ticket.total, id_usuario: 1})
                        .then((empty) => {
                            if(cont == 3){
                                Usuarios.deleteUser(2)
                                .then((empty) => {
                                    Usuarios.allUsers()
                                    .then((listaUsuarios) => {
                                        expect(listaUsuarios.length).to.equal(4)
                                    })
                                })
                                return;
                            }
                        })
                        
                    }
                })
            })
            done();
        });
    });

    describe('Usuarios.getUserByEmail', () => {
        it('Se obtiene un usuario por su email', (done) =>{
            Usuarios.getUserByEmail("pedrito_16@gmail.com")
            .then((data) => {
                expect(data.length).to.equal(1)
            })
            done();
        });
    });

    describe('Inventario.deleteProductosFromInventario', () => {
        it('Se elimina un producto del inventario.', (done) =>{
            Inventario.allInventory()
            .then ((inventario) => {
                Inventario.deleteProductosFromInventario(2)
                .then ((data) => {
                    Inventario.allInventory()
                    .then ((newInventario) => {
                        expect(inventario.length-newInventario.length).to.equal(3)
                    })
                })
            })
            done();
        });
    });

    describe('Ventas.updateSale', () => {
        it('Se modifican los id_product de ventas.', (done) =>{
            Ventas.allSalesOfAProduct(2)
            .then((data) => {
                for(let i = 0; i < data.length; i++){
                    Ventas.updateSale(data[i].id, {id_ticket: data[i].id_ticket, id_producto: 1})
                    .then((empty) =>{
                        if(i == data.length-1){
                            Ventas.allSalesOfAProduct(2)
                            .then((ventas) =>{
                                expect(ventas.length).to.equal(0)
                            })
                        }
                    })
                    
                }
            })
            done();
        });
    });

    describe('Inventario.deleteProductosFromInventario y Ventas.updateSale', () => {
        it('Se elimina un producto de la base de datos.', (done) =>{
            let id_producto = 2
            Inventario.deleteProductosFromInventario(id_producto)
            .then ((dataEmpty) => {
                Ventas.allSalesOfAProduct(id_producto)
                .then((data) => {
                    for(let i = 0; i < data.length; i++){
                        Ventas.updateSale(data[i].id, {id_ticket: data[i].id_ticket, id_producto: 1})
                        .then((empty) =>{
                            if(i == data.length-1){
                                Ventas.allSalesOfAProduct(2)
                                .then((ventas) =>{
                                    expect(ventas.length).to.equal(0)
                                    Inventario.deleteProducto(id_producto)
                                    .then((dataEmpty) =>{
                                        // Aquí se acaba
                                        Inventario.allProducts()
                                        .then((newProductos) => {
                                            expect(newProductos.length).to.equal(5)
                                        })
                                    })
                                })
                            }
                        })
                    }
                })
            })
            done();
        });
    });

    /*
    describe('Tickets.getFinalPriceFromProductList', () => {
        it('Se obtienen varios precios de productos de la tabla inventario y se suman', (done) =>{
            let numbers = [1, 2, 2, 2, 3, 4, 5, 8, 7, 5, 9].sort();
            let specimens = numbers.filter((number, i) => i == 0 ? true : numbers[i - 1] != number);
            let counterSpecimens = specimens.map(spec => {
                return {number: spec, count: 0};
            });

            counterSpecimens.map((countSpec, i) =>{
                let actualSpecLength = numbers.filter(number => number === countSpec.number).length;
                countSpec.count = actualSpecLength;
            })
            done();
        });
    });*/
    /*
    describe('Tickets.getFinalPriceFromProductList', () => {
        it('Se obtienen varios precios de productos de la tabla inventario y se suman', (done) =>{
            let lista = [2, 2, 2, 2];
            Inventario.getPriceIdInventoryList(lista)
            .then((data) => {
                console.log(data);
            }).then(done, done);
        });
    });*/

    /*
    describe('Tickets.updateTicket', () => {
        it('Se actualiza un ticket', (done) =>{
            Tickets.updateTicket(3, {total: 3500.25, id_usuario: 2})
            .then((data) => {
                Tickets.getTicketById(3)
                .then((data2) => {
                    expect(data2.id).to.equal(3);
                    expect(parseFloat(data2.total)).to.equal(3500.25);
                    expect(data2.id_usuario).to.equal(2);
                }).then(done, done);
            });
        });
    });*/

});
