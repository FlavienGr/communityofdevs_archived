const axios = require('axios');
const Devs = require('../../model/Devs');
const Helper = require('../../utils/helper');
const sendResponse = require('../../utils/sendResponse');

let token = null;
exports.login = (_req, res, _next) => {
  const redirect_uri =
    'http://localhost:5000/api/v1/devs/auth/login/github/callback';
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
};

// @desc   Login a user
// @route  Post api/v1/user/auth/login
// @access Public

exports.getAccessToken = async (req, res, next) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code
  };
  const opts = { headers: { accept: 'application/json' } };

  try {
    const request = await axios.post(
      `https://github.com/login/oauth/access_token`,
      body,
      opts
    );
    if (request.data) {
      token = request.data['access_token'];
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: 'token ' + token
        }
      });
      const userFromGithub = await response.data;
      let user = await Devs.findById(userFromGithub.id);
      if (!user) {
        user = await Devs.signup(userFromGithub);
      }
      const newtoken = await Helper.generateToken(user.id, 'developer');
      sendResponse(user, newtoken, 201, res, 'http://localhost:3000/devs');
      // console.log(user, 'user');
      // console.log(newtoken, 'newtoken');
      // res.send('ok');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
