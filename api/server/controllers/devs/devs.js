const DatabaseConnectionError = require('../../errors/databaseConnectionError');
const RequestAuthErrors = require('../../errors/request-auth-errors');
const RequestInsertErrors = require('../../errors/request-insert-errors');
const removeDuplicateField = require('../../utils/removeDuplicatedField');
const Devs = require('../../model/Devs');
const validInsertData = require('../../utils/validInsertData');

// @desc   get current devs
// @route  delete /api/v1/devs/currentuser
// @access Private

exports.getCurrentUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await Devs.getCurrentUser(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(new DatabaseConnectionError());
  }
};

// @desc   get a dev profile
// @route  get /api/v1/devs/profile
// @access Private
exports.getProfile = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await Devs.getProfileDevById(id);
    if (!user) {
      return next(new RequestAuthErrors());
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    next(new DatabaseConnectionError());
  }
};

// @desc   update a dev
// @route  put /api/v1/devs
// @access Private

exports.updateDevs = async (req, res, next) => {
  const allowInsert = ['name', 'email', 'location', 'blog', 'username'];
  const isNotValid = validInsertData(req.body, allowInsert);
  if (isNotValid) {
    return next(new RequestInsertErrors());
  }

  try {
    const devs = await Devs.getProfileDevById(req.user.id);
    let updateUser = { ...req.body };
    const keys = Object.keys(req.body);
    if (keys.includes('username')) {
      updateUser['login'] = updateUser.username;
      delete updateUser.username;
    }
    const updateData = removeDuplicateField(updateUser, devs);
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({ success: true, data: user });
    }
    if (updateData.login !== undefined) {
      console.log(undefined, 'updatedData undefined');

      const userNameExists = await Devs.findByUsername(updateData.login);
      if (userNameExists) {
        return next(
          new RequestAuthErrors(
            'This username is already taken, please choose another one'
          )
        );
      }
    }
    console.log(updatedData, 'updatedData');
    const userUpdated = await Devs.updateById(updateData, req.user.id);
    return res.status(200).json({ success: true, data: userUpdated });
  } catch (error) {
    return next(new DatabaseConnectionError());
  }
};
