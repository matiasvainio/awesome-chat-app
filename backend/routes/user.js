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

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

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

usersRouter.put('/', async (req, res) => {
  try {
    const returned = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

module.exports = usersRouter;
