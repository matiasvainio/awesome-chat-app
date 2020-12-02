const express = require('express');
const router = express.Router();
const Message = require('../models/message.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(mongoSanitize());

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

/* GET ALL MESSAGES */
router.get('/', async (req, res, next) => {
  console.log(req);

  const token = getTokenFrom(req);
  if (!token) {
    res.sendStatus(401);
  }

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.find({ roomId: req.query.id }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MESSAGE BY ID */
router.get('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MESSAGE */
router.post('/', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MESSAGE */
router.put('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { body } = req;

  console.log(body);

  try {
    const returned = await Message.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.json(returned.toJSON());
  } catch (exception) {
    response.sendStatus(404);
  }
});

/* DELETE MESSAGE */
router.delete('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.findByIdAndRemove(
    req.params.id,
    req.body,
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
});

module.exports = router;
