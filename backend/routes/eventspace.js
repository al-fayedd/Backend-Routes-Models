const express = require('express');
const Eventspace = require('../models/Eventspace');
const router = express.Router();

// Create a new event space
router.post('/', async (req, res) => {
    const { event_space_ID, name_event_space, location, highlight, description, price, capacity, office_number, image_logo, image1, image2, image3 } = req.body;
    try {
        // Validate required fields
        if (!event_space_ID || !name_event_space || !location || !highlight || !description || !price || !capacity || !image_logo || !image1) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const eventspace = new Eventspace({ event_space_ID, name_event_space, location, highlight, description, price, capacity, office_number, image_logo, image1, image2, image3 });
        await eventspace.save();
        res.status(201).json({ message: 'Event space created', eventspace });
    } catch (error) {
        console.error(error); // For debugging
        res.status(400).json({ error: error.message });
    }
});

// Retrieve all event spaces
router.get('/', async (req, res) => {
    try {
        const eventspaces = await Eventspace.find();
        res.json(eventspaces);
    } catch (error) {
        console.error(error); // For debugging
        res.status(500).json({ error: error.message });
    }
});

// Delete an event space by event_space_ID
router.delete('/:event_space_ID', async (req, res) => {
    const { event_space_ID } = req.params;
    try {
        const result = await Eventspace.deleteOne({ event_space_ID });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Event space not found' });
        }

        res.status(200).json({ message: 'Event space deleted' });
    } catch (error) {
        console.error(error); // For debugging
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
