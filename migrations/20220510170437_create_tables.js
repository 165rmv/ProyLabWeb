exports.up = async function(knex, Promise) {
    //return Promise.all([
        await knex.schema.createTable('productos', (table) => {
            table.increments('id');
            table.string('nombre', 255).notNullable();
            table.string('tipo', 255);
            table.string('genero', 10);
            table.decimal('precio', 8, 2).notNullable();
            table.string('descripcion', 512).notNullable();
            table.timestamps(true, true);
        });
        await knex.schema.createTable('usuarios', (table) => {
            table.increments('id');
            table.string('nombre', 255).notNullable();
            table.string('apellido', 255).notNullable();
            table.string('rol', 255).notNullable();
            table.string('id_fb', 255).notNullable();
            table.timestamps(true, true);
        });
        await knex.schema.createTable('inventario', (table) => {
            table.increments('id');
            table.integer('id_producto')
                .unsigned()
                .index()
                .references('id')
                .inTable('productos');
            table.string('talla', 10).notNullable();
            table.integer('cantidad').notNullable();
            table.timestamps(true, true);
        });
        await knex.schema.createTable('tickets', (table) => {
            table.increments('id');
            table.decimal('total', 10, 2).notNullable();
            table.integer('id_usuario')
                .unsigned()
                .index()
                .references('id')
                .inTable('usuarios');
            table.timestamps(true, true);
        });
        await knex.schema.createTable('ventas', (table) => {
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
    //]);
    
};

exports.down = async function(knex, Promise) {
    //return Promise.all([
        await knex.schema.dropTable('ventas'),
        await knex.schema.dropTable('tickets'),
        await knex.schema.dropTable('inventario'),
        await knex.schema.dropTable('usuarios'),
        await knex.schema.dropTable('productos')
    //]);
};
