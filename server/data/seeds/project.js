const Knex = require('knex');
const tableProject = require('../../constants/tableProject');


/**
 * @param {Knex} knex
 */

exports.seed = async function(knex) {

  // Deletes ALL existing entries
  await Promise.all(Object
    .keys(tableProject)
    .map((name) => knex(name).del()));

  // Inserts seed entries status
    const status = [{name: "En Cours"}, {name: "Proposition"}, {name: "Terminé"}]
    await knex(tableProject.project_status)
    .insert(status, '*');

}
