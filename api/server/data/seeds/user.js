const Knex = require('knex');
const Helper = require('../../utils/helper')
const tableUser = require('../../constants/tableUser');



/**
 * @param {Knex} knex
 */

exports.seed = async function(knex) {
  const password = Helper.hashPassword('testPassword')
  const userOne = {
    name: "firstuser",
    email: "firstuser@fake.com",
    immatriculation: "5728JSJSSLJS",
    password
  }
  // Deletes ALL existing entries
  await Promise.all(Object
    .keys(tableUser)
    .map((name) => knex(name).del()));

  // Inserts seed entries user
  const user = await knex(tableUser.user).insert(userOne)

}
