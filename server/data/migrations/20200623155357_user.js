const Knex = require('knex');
const tableUser = require('../../constants/tableUser')


function addDefaultColumns (table) {
  return table.timestamps(false,true)
}
function references (table, tableName) {
    return table.uuid(`${tableName}_id`)
    .references('id')
    .inTable(tableName)
    .onDelete('cascade')
}
/**
 * @param {Knex} knex
 */
exports.up = async function(knex) {
  await knex.schema.createTable(tableUser.user, table => {
    table.uuid('id').primary(); //ids
    table.string('name', 100).notNullable().unique();
    table.string('email', 100).notNullable().unique();
    table.string('password', 128).notNullable();
    table.boolean('blocked').defaultTo(false);
    table.string('resetToken', 128);
    table.string('resetTokenExpire', 128);
    table.boolean('cgu').defaultTo(false);
    table.datetime('last_login');
    addDefaultColumns(table);
  })

  await knex.schema.createTable(tableUser.user_country, table => {
    table.uuid('id').primary();
    table.string('name', 50).notNullable();
  })
  await knex.schema.createTable(tableUser.user_state, table => {
    table.uuid('id').primary();
    table.string('name', 50).notNullable();
  })

  await knex.schema.createTable(tableUser.user_address, table => {
      table.uuid('id').primary();
      references(table, 'user');
      table.string('street_address_1').notNullable();
      table.string('street_address_2');
      table.string('city').notNullable();
      table.string('zipcode');
      references(table, 'user_state');
      references(table, 'user_country');
  })

};

exports.down = async function(knex) {
  await Promise.all([
    tableUser.user_address,
    tableUser.user_state,
    tableUser.user_country,
    tableUser.user
  ].map(tableName => knex.schema.dropTableIfExists(tableName)));
};
