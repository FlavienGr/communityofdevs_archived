const Knex = require('knex');
const Helper = require('../../utils/helper')
const tableUser = require('../../constants/tableUser');
const countries = require('../../constants/countries');
const departments = require('../../constants/departments');

const allCities = Object.entries(require('../../constants/cities'))


/**
 * @param {Knex} knex
 */

exports.seed = async function(knex) {
  const password = Helper.hashPassword('testPassword')
  const userOne = {
    name: "firstuser",
    email: "firstuser@fake.com",
    password
  }
  // Deletes ALL existing entries
  await Promise.all(Object
    .keys(tableUser)
    .map((name) => knex(name).del()));

  // Inserts seed entries user
  const user = await knex(tableUser.user).insert(userOne)

  const insertedCountries = await knex(tableUser.user_country)
    .insert(countries, '*');
  const insertedDepartments = await knex(tableUser.user_state)
  .insert(departments, '*');

  for (const [key, value] of allCities) {
    await knex(tableUser.user_city).insert(value)
  }
}
