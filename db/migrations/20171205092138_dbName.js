exports.up = function(knex, Promise) {
  return knex.schema.createTable('clucks', table => {
    table.increments('id');
    table.string('username');
    table.text('content');
    table.string('image_url');
    table.timestamps(false, true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clucks');
};
