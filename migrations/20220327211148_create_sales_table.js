exports.up = function(knex) {
    return knex.schema
      .createTable('ventas', (table) => {
        table.increments('id');
        table.integer('id_ticket')
            .unsigned()
            .index()
            .references('id')
            .inTable('tickets');
        table.integer('id_producto')
            .unsigned()
            .index()
            .references('id')
            .inTable('productos');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('ventas');
  };