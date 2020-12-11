const express = require('express');
const messageRouter = express.Router();
const Message = require('../models/message.js');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

messageRouter.use(bodyParser.urlencoded({ extended: true }));
messageRouter.use(bodyParser.json());
messageRouter.use(mongoSanitize());

const getTokenFrom = (req) => {
  const authorization = req.get('authorization');

  console.log('request', req);

  console.log('authorization', authorization);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

/* GET ALL MESSAGES */
/**
 * Gets all messages.
 * @name messageRouter_get_All
 * @param {string} req Express get request
 * @param {string} res Express get result
 * @example router.get('/',
 */
messageRouter.get('/', async (req, res, next) => {
  const token = getTokenFrom(req);
  if (!token) {
    res.sendStatus(401);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.find({ roomId: req.query.id }, function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MESSAGE BY ID */
/**
 * Gets single message by id.
 * @name messageRouter_get_One
 * @param {string} req Express request
 * @param {string} res Express result
 * @example router.get('/:id',
 */
messageRouter.get('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MESSAGE */
/**
 * Saves message to database.
 * @name messageRouter_post_Message
 * @param {string} req Express request
 * @param {string} res Express result
 * @example router.post('/',
 */
messageRouter.post('/', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  await Message.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MESSAGE */
/**
 * Updates selected message.
 * @name messageRouter_put_selected_Message
 * @param {string} req Express request
 * @param {string} res Express result
 * @example router.put('/:id',
 */
messageRouter.put('/:id', async (req, res, next) => {
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { body } = req;

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
/**
 * Delete selected message.
 * @name messageRouter_delete_selected_Message
 * @param {string} req Express request
 * @param {string} res Express result
 * @example router.delete('/:id',
 */
messageRouter.delete('/:id', async (req, res, next) => {
  console.log('params', req.params);
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
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

module.exports = messageRouter;
