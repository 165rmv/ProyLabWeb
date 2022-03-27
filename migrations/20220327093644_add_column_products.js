exports.up = function(knex) {
    return knex.schema.table('productos', table => {
      table.string('tipo', 255);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.table('productos', table => {
      table.dropColumn('tipo');
    })
  };