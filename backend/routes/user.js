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

<<<<<<< HEAD
=======
  console.log(body);

  const usernameLowerCase = JSON.stringify(body.username).toLowerCase();

>>>>>>> 78217333b6834fad19324e41b692712410722104
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: JSON.parse(usernameLowerCase),
    passwordHash,
  });

  const savedUser = await user.save();

  res.json(savedUser);
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
