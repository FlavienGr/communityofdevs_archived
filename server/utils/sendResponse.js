const sendResponse = (user, statusCode, res) => {
  return res.status(statusCode).send({ success: true, data: user });
};
module.exports = sendResponse;
