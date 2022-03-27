exports.up = function(knex) {
    return knex.schema
      .createTable('inventario', (table) => {
        table.integer('id_producto')
            .unsigned()
            .index()
            .references('id')
            .inTable('productos');
        table.string('talla', 10).notNullable();
        table.integer('cantidad').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('inventario');
  };