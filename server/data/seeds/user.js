const tableUser = require('../../constants/tableUser')
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex(tableUser.user_country).del()
  await knex(tableUser.user_state).del()

  // Inserts seed entries user
  await knex(tableUser.user_state).insert([{
     "name": "île-de-france"
    }, {
      "name": "charente maritime"
     }], ['id']);


  await knex(tableUser.user_country).insert([{
      name: "USA"
    }, {
      name: "france"
    }], ['id']);
};
