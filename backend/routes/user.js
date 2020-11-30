const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const cors = require('cors');
usersRouter.use(cors());

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { body } = req;

  console.log(body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
});

module.exports = usersRouter;
