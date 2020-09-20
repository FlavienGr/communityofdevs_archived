const Knex = require('knex');
const tableProject = require('../../constants/tableProject')
const tableDevs = require('../../constants/tableDevs');

/**
 * @param {Knex} knex
 */

function addDefaultColumns (table) {
  return table.timestamps(false,true)
}
function references (table, tableName) {
    return table.integer(`${tableName}_id`)
    .unsigned()
    .references('id')
    .inTable(tableName)
    .onDelete('cascade')
}
exports.up = async function(knex) {
  await knex.schema.createTable(tableProject.project_status, table => {
    table.increments();
    table.string('name', 20).notNullable();
  })
  await knex.schema.createTable(tableProject.project, table => {
    table.increments();
    table.string('name', 150).notNullable().unique();
    references(table, "user")
    references(table, tableProject.project_status)
    table.string('summary', 1500).notNullable();
    table.string('description').notNullable();
    table.string('uuid', 50).notNullable().unique();
    addDefaultColumns(table);
  })
  await knex.schema.createTable(tableProject.project_status_relation, table => {
    table.increments();
    table.string('name', 20).notNullable();
  })
  await knex.schema.createTable(tableProject.project_relation, table => {
    references(table, tableProject.project);
    references(table, tableProject.project_status_relation);
    references(table, tableProject.devs);
    addDefaultColumns(table);
  })
};

exports.down = async function(knex) {
  await Promise.all([
    tableProject.project_relation,
    tableProject.project_status_relation,
    tableProject.project,
    tableProject.project_status
  ].map(tableName => knex.schema.dropTableIfExists(tableName)));
};
