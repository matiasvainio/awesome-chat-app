const express = require('express');
const router = express.Router();
const Room = require('../models/room.js');

const User = require('../models/user');

const cors = require('cors');

router.use(cors());

// const userStream = User.watch();
// userStream.on('change', (change) => {
//   console.log('muutos');
// });

/* GET ALL ROOMS */
router.get('/', async (req, res, next) => {
  const rooms = await Room.find({}).populate('users', {
    room: 0,
  });

  res.json(rooms.map((room) => room.toJSON()));
});

/* GET SINGLE ROOM BY ID */
router.get('/:id', async (req, res, next) => {
  const rooms = await Room.findById(req.params.id).populate('users');

  res.json(rooms);
});

/* SAVE ROOM */
router.post('/', function (req, res, next) {
  Room.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ROOM */
router.put('/:id', function (req, res, next) {
  Room.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ROOM */
router.delete('/:id', function (req, res, next) {
  Room.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
