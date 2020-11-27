var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = require('../models/message.js');

/* GET ALL MESSAGES */
router.get('/', function(req, res, next) {
    Message.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE MESSAGE BY ID */
router.get('/:id', function(req, res, next) {
    Message.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE MESSAGE */
router.post('/', function(req, res, next) {
    Message.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE MESSAGE */
router.put('/:id', function(req, res, next) {
    Message.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE MESSAGE */
router.delete('/:id', function(req, res, next) {
    Message.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;