const db = require("../api/server/db/index");
const tableUser = require("../api/server/constants/tableUser");
const Helper = require("../api/server/utils/helper");

const addUserInTables = async () => {
  const password = Helper.hashPassword("testPassword");
  try {
    const request = await db(tableUser.user).insert(
      {
        email: "user-test@fake.com",
        password,
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

addUserInTables();
