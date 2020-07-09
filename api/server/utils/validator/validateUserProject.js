const { check, body } = require('express-validator');

const configProject = [
  check('name')
    .exists()
    .withMessage('you should add a name')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 chars long'),
  check('summary')
    .exists()
    .withMessage('you should add a summary for your project')
    .isLength({ max: 1500, min: 30 })
    .withMessage('name must be at least 30 chars and max 1500 chars long')
];
const configProjectUpdate = [
  check('name')
    .if(body('name').exists())
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 chars long'),
  check('summary')
    .if(body('summary').exists())
    .isLength({ max: 1500, min: 30 })
    .withMessage('name must be at least 30 chars and max 1500 chars long')
];
const project = [...configProject];
const udpate = [...configProjectUpdate];

module.exports = {
  project,
  udpate
};
