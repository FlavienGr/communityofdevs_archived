const sendResponse = (user, statusCode, res) => {
  const isCookieSecure = process.env.NODE_ENV === 'production';
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: isCookieSecure,
    secure: isCookieSecure
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie('token', user.jwt, options)
    .send({ success: true, data: user });
};
module.exports = sendResponse;
