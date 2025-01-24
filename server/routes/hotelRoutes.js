const express = require('express');
const { getHotelStatus, bookRooms, randomizeOccupancy, resetBookings } = require('../data/hotelData');

const router = express.Router();

// Get hotel status
router.get('/status', (req, res) => {
  const status = getHotelStatus();
  res.json({ status });
});

// Book rooms
router.post('/book', (req, res) => {
  const { numberOfRooms } = req.body;

  if (!numberOfRooms || numberOfRooms < 1 || numberOfRooms > 5) {
    return res.status(400).json({ message: 'You can only book between 1 and 5 rooms.' });
  }

  const result = bookRooms(numberOfRooms);
  res.json(result);
});

// Randomize room occupancy
router.post('/randomize', (req, res) => {
  randomizeOccupancy();
  res.json({ message: 'Room statuses randomized.' });
});

// Reset room bookings
router.post('/reset', (req, res) => {
  resetBookings();
  res.json({ message: 'All rooms have been reset to available.' });
});

module.exports = router;
