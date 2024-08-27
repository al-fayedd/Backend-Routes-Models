const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Create a new reservation
router.post('/', async (req, res) => {
  const { user_ID, customer_name, customer_email, customer_phone, date_reservation, time_reservation, name_event_space, remarks } = req.body;
  try {
    // Validate required fields
    if (!user_ID || !customer_name || !customer_email || !customer_phone || !date_reservation || !time_reservation || !name_event_space) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reservation = new Reservation({ user_ID, customer_name, customer_email, customer_phone, date_reservation, time_reservation, name_event_space, remarks });
    await reservation.save();
    res.status(201).json({ message: 'Reservation created', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error); // Enhanced debugging
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all reservations with optional filtering
router.get('/', async (req, res) => {
  try {
    const { user_ID, name_event_space, date_reservation } = req.query;
    const query = {};
    
    if (user_ID) query.user_ID = user_ID;
    if (name_event_space) query.name_event_space = name_event_space;
    if (date_reservation) query.date_reservation = new Date(date_reservation);

    const reservations = await Reservation.find(query);
    res.json(reservations);
  } catch (error) {
    console.error('Error retrieving reservations:', error); // Enhanced debugging
    res.status(500).json({ error: error.message });
  }
});

// Delete a reservation by reference_number
router.delete('/:reference_number', async (req, res) => {
  const { reference_number } = req.params;
  try {
    const result = await Reservation.deleteOne({ reference_number });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json({ message: 'Reservation deleted' });
  } catch (error) {
    console.error('Error deleting reservation:', error); // Enhanced debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
