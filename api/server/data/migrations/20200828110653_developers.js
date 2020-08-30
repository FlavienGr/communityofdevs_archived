const Knex = require('knex');
const tableDevs = require('../../constants/tableDevs');

/**
 * @param {Knex} knex
 */

function addDefaultColumns(table) {
  return table.timestamps(false, true);
}
function references(table, tableName) {
  return table
    .integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade');
}
exports.up = async function(knex) {
  await knex.schema.createTable(tableDevs.devs, table => {
    table.integer('id').unique();
    table.string('email', 100);
    table.string('login', 100).unique();
    table.string('name', 100);
    table.string('location', 100);
    table.string('blog', 100);
    table.string('html_url', 100);
  });
};

exports.down = async function(knex) {
  await Promise.all(
    [tableDevs.devs].map(tableName => knex.schema.dropTableIfExists(tableName))
  );
};
