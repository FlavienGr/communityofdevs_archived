const sendResponse = (user, statusCode, res) => {
  const isCookieSecure = process.env.NODE_ENV === 'production';
  const date = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  );
  const options = {
    expires: date,
    httpOnly: isCookieSecure,
    secure: isCookieSecure
  };

  return res
    .status(statusCode)
    .cookie('token', user.jwt, options)
    .send({ success: true, data: user });
};
module.exports = sendResponse;
