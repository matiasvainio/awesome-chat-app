const express = require('express');
const router = express.Router();
const Message = require('../models/message.js');

/* GET ALL MESSAGES */
router.get('/', async (req, res, next) => {
  await Message.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MESSAGE BY ID */
router.get('/:id', async (req, res, next) => {
  await Message.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MESSAGE */
router.post('/', async (req, res, next) => {
  await Message.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MESSAGE */
router.put('/:id', async (req, res, next) => {
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
