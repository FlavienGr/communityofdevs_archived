const db = require("../api/server/db/index");
const tableUser = require("../api/server/constants/tableUser");

const deleteAllinUserTables = async () => {
  try {
    const response = await db(tableUser.user).del();
    console.log(response, "response");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const addUserInTables = async () => {
  try {
    const request = await db(tableUser.user).insert(
      {
        email: "user-test@fake.com",
        password: "testPassword",
        name: "user-test",
        immatriculation: "user-test",
        cgu: true,
      },
      ["id"]
    );
    console.log(request, "response");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
deleteAllinUserTables();
// addUserInTables()
