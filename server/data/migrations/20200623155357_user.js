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
    table.increments() //ids
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
    table.increments();
    table.string('name', 100).notNullable();
    table.string('code', 2).notNullable();
  })
  await knex.schema.createTable(tableUser.user_city, table => {
    table.increments();
    table.string('name', 100).notNullable();
    table.string('code', 3).notNullable();
    table.string('zipcode', 6).notNullable();
    table.string('slug', 100).notNullable();
  })
  await knex.schema.createTable(tableUser.user_state, table => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 100).notNullable();
    table.string('code', 3).notNullable();
  })

  await knex.schema.createTable(tableUser.user_address, table => {
      table.increments();
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
    tableUser.user_city,
    tableUser.user
  ].map(tableName => knex.schema.dropTableIfExists(tableName)));
};
