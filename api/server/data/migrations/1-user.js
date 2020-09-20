const Knex = require('knex');
const tableUser = require('../../constants/tableUser')

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
  await knex.schema.createTable(tableUser.user, table => {
    table.increments(); //ids
    table.string('name', 100).notNullable().unique();
    table.string('email', 50).notNullable().unique();
    table.string('password', 128).notNullable();
    table.string('immatriculation', 15).notNullable();
    table.boolean('blocked').notNullable().defaultTo(false);
    table.string('resetToken', 128);
    table.string('resetTokenExpire', 128);
    table.boolean('cgu').notNullable().defaultTo(0);
    table.datetime('last_login');
    addDefaultColumns(table);
  })

  await knex.schema.createTable(tableUser.user_address, table => {
      table.increments();
      references(table, 'user');
      table.string('street');
      table.string('zipcode', 6);
      table.string('state', 100);
      table.string('city', 100);
      table.string('country', 100);
  })

};

exports.down = async function(knex) {
  await Promise.all([
    tableUser.user_address,
    tableUser.user
  ].map(tableName => knex.schema.dropTableIfExists(tableName)));
};
