var assert = require('assert');


let Inventario = require('../models/inventario');
let Tickets = require('../models/tickets');
let Ventas = require('../models/sales')

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
    });

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

    describe('Tickets.allTickets', () => {
        it('Se obtienen todos los tickets de la tabla "Tickets"', (done) =>{
            Tickets.allTickets()
            .then((data) => {
                expect(data.length).to.equal(6);
            }).then(done, done);
        });
    });

    describe('Tickets.insertTicket', () => {
        it('Se agrega un ticket a la tabla "Tickets"', (done) =>{
            Tickets.insertTicket(0.00, 1)
            .then((data) => {
                Tickets.allTickets()
                .then((data2) => {
                    expect(data2.length).to.equal(7);
                }).then(done, done);
            });
        });
    });

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
    
    describe('Tickets.getProductPriceFromIdInventory_multiple', () => {
        it('Se realiza la venta, agregando a la tabla "tickets" y a la tabla "ventas"', (done) =>{
            let total = 0.00;
            let lista = [2, 2, 2, 2];
            Tickets.insertTicket(0.00, 2)
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
                                                    expect(parseFloat(data7.id_usuario)).to.equal(2);
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
    });

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

            console.log(counterSpecimens[1]);
            done();
        });
    });
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
