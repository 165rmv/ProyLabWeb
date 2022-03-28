exports.up = function(knex) {
    return knex.schema
      .createTable('usuarios', (table) => {
        table.increments('id');
        table.string('nombre', 255).notNullable();
        table.string('apellido', 255).notNullable();
        table.string('rol', 255).notNullable();
        table.string('id_fb', 255).notNullable();
        table.timestamps(true, true);
      });
  };
  
exports.down = function(knex) {
    return knex.schema
      .dropTable('usuarios');
};