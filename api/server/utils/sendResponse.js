const sendResponse = (user, token, statusCode, res, address) => {
  const isCookieSecure = process.env.NODE_ENV === 'production';
  const date = new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  );
  const options = {
    expires: date,
    httpOnly: isCookieSecure,
    secure: isCookieSecure
  };
  if (address) {
    return res.cookie('token', token, options).redirect(301, address);
  }
  return res
    .status(statusCode)
    .cookie('token', token, options)
    .send({ success: true, data: user });
};
module.exports = sendResponse;
