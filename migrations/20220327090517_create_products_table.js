exports.up = function(knex) {
    return knex.schema
      .createTable('productos', (table) => {
        table.increments('id');
        table.string('nombre', 255).notNullable();
        table.string('tipo', 255);
        table.string('genero', 10);
        table.decimal('precio', 8, 2).notNullable();
        table.string('descripcion', 512).notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('productos');
  };
