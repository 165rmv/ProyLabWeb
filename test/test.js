var assert = require('assert');
const knex = require('../database/connection');
let Inventario = require('../models/inventario');

describe('Session routes', () => {
    beforeEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run()
                .then(function() {
                    done();
                });
            });
        });
    });
    
    afterEach(function(done) {
        knex.migrate.rollback()
        .then(function() {
            done();
        });
    });

    describe('Añadir un nuevo producto al inventario', () =>{
        Inventario.allProducts(function(err, productos){
            assert.equal(productos.length, 0);
            done();
        });
    });

});
