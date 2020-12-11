const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const { validateUser } = require('../validators/userValidator');
const { response } = require('express');
usersRouter.use(cors());
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());
usersRouter.use(mongoSanitize());

/**
 * Gets all users.
 * @name usersRouter_get_All
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example usersRouter.get('/',
 */
usersRouter.get('/', async (req, res) => {
  // const token = req.get('authorization');

  // if (!token) {
  //   res.status(401).json({ error: 'not authorized' });
  // }
  const users = await User.find({}).populate('room', { users: 0 });
  res.json(users);
});

/**
 * Gets one user by given id.
 * @name usersRouter_get_One
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example usersRouter.get('/:id',
 */
usersRouter.get('/:id', async (req, res) => {
  try {
    const returned = await User.findById(req.params.id);
    res.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

/**
 * Add new user to database based on data from express post method.
 * @name usersRouter_post_One
 * @param {string} req Express post request
 * @param {string} res Express post result
 * @param {express-validator} validateUser Custom express validator for username and password
 * @example usersRouter.post('/',
 */
usersRouter.post('/', validateUser, async (req, res) => {
  const { body } = req;

  const usernameLowerCase = JSON.stringify(body.username).toLowerCase();

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: JSON.parse(usernameLowerCase),
    passwordHash,
  });

  const savedUser = await user.save((err) => {
    if (err) {
      res.status(400).json(err.message).end();
    } else {
      res.status(200).json(savedUser);
    }
  });
});

/**
 * Updates user based on data from express put method.
 * @name usersRouter_put_One
 * @param {string} req Express put request
 * @param {string} res Express put result
 * @example usersRouter.put('/:id',
 */
usersRouter.put('/:id', async (req, res) => {
  // Todo err handling
  const { body } = req;
  try {
    const returned = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.json(returned.toJSON());
  } catch (err) {
    res.sendStatus(404);
  }
});

/**
 * Deletes user based on data from express delete method.
 * @name usersRouter_delete_One
 * @param {string} req Express delete request
 * @param {string} res Express delete result
 * @example usersRouter.delete('/:id',
 */
usersRouter.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(204).end();
});

module.exports = usersRouter;
