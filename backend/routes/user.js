const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const { validateUser } = require('../validators/userValidator');
usersRouter.use(cors());
usersRouter.use(bodyParser.urlencoded({ extended: true }));
usersRouter.use(bodyParser.json());
usersRouter.use(mongoSanitize());

usersRouter.get('/', async (req, res) => {
  const token = req.get('authorization');

  if (!token) {
    res.status(401).json({ error: 'not authorized' });
  }

  const users = await User.find({});
  res.json(users);
});

usersRouter.post('/', validateUser, async (req, res) => {
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
