exports.up = function(knex, Promise) {
  return knex.schema.createTable('trending_topics', table => {
    table.increments('id');
    table.string('topic');
    table.integer('count').defaultTo(1);
    table.timestamps(false, true);
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('trending_topics');
};
