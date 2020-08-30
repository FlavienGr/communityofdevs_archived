const axios = require('axios');
const Devs = require('../../model/Devs');
const Helper = require('../../utils/helper');
const sendResponse = require('../../utils/sendResponse');
const NotAllowedToAccess = require('../../errors/notAllowedToAccess');

let token = null;
exports.login = (_req, res, _next) => {
  const redirect_uri =
    'http://localhost:5000/api/v1/devs/auth/login/github/callback';
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${redirect_uri}`
  );
};

// @desc   get access token
// @route  Post api/v1/devs/auth/login
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
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc   Logout a developeur
// @route  Post api/v1/devs/auth/logout
// @access Private

exports.devLogout = async (_req, res, _next) => {
  res.clearCookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
};
// @desc   register a developeur / tests purposes
// @route  Post api/v1/devs/auth/signup
// @access public

exports.devSignup = async (req, res, _next) => {
  const test = process.env.NODE_ENV === 'test';
  if (!test) {
    return next(new NotAllowedToAccess());
  }
  try {
    const random = Math.floor(Math.random() * 150);
    const newtoken = await Helper.generateToken(random, 'developer');
    const user = await Devs.signupForTest({ id: random, ...req.body });
    sendResponse(user, newtoken, 201, res);
  } catch (error) {
    console.log(error);
  }
};
