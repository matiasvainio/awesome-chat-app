const express = require('express');
const router = express.Router();
const Message = require('../models/message.js');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.use(cors());

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

/* GET ALL MESSAGES */
router.get('/', async (req, res, next) => {
  const token = getTokenFrom(req);
  if (!token) {
    res.sendStatus(401);
  }

  const decodedToken = jwt.verify(token, 'SALAISUUS');
  if (!decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
  }
  await Message.find(function (err, products) {
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

  await Message.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    }
  );
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
