exports.sanitizedUser = (data, token) => {
  const user = { ...data };
  if (user.password) {
    delete user.password;
  }
  return {
    ...user,
    jwt: token
  };
};
