exports.up = function(knex) {
    return knex.schema
      .createTable('tickets', (table) => {
        table.increments('id');
        table.decimal('total', 10, 2).notNullable();
        table.integer('id_usuario')
            .unsigned()
            .index()
            .references('id')
            .inTable('usuarios');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('tickets');
  };