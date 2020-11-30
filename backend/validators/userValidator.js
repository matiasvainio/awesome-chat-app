const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('password')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid password!')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
