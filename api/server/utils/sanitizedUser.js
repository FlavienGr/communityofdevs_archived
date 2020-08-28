exports.sanitizedUser = data => {
  const user = { ...data };
  if (user.password) {
    delete user.password;
  }
  return user;
};
