exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('usuarios').del()
    .then(function () {
    return knex('usuarios').insert([
      {nombre: 'Pedro', apellido: 'Ramirez', rol: 'cajero', id_fb: 't7fUYt2f2yt3hjg271kU9Y0HG2j'},
      {nombre: 'Fernanda', apellido: 'Gutierrez', rol: 'gerente', id_fb: 'DhjyD2Blu44L78i09npI3hlñOUv'},
      {nombre: 'Alejandro', apellido: 'Martinez', rol: 'cajero', id_fb: 'dGRE27vbHYr9bE0vERfVRT83hWklu'}
    ]);
  })
};