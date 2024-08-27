const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventspaceSchema = new Schema({
    event_space_ID: { type: String, required: true, unique: true  }, // Ensure each event space has a unique ID
    name_event_space: { type: String, required: true },
    location: { type: String, required: true },
    highlight: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    capacity: { type: Number, required: true },
    office_number: { type: String,default: '' },// Default to an empty string if not provided
    image_logo: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String,default: ''}, // Default to an empty string if not provided
    image3: { type: String,default: ''}, // Default to an empty string if not provided
    }, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Add indexes based on common queries
eventspaceSchema.index({ location: 1 });
eventspaceSchema.index({ name_event_space: 1 });

module.exports = mongoose.model('Eventspace', eventspaceSchema);




// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const eventspaceSchema = new Schema({
//     event_space_ID: { type: String, required: true },
//     name_event_space: { type: String, required: true },
//     location: { type: String, required: true },
//     highlight: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true }, // Use Number for price
//     capacity: { type: Number, required: true }, // Use Number for capacity
//     office_number: { type: String }, // Optional field, make it not required if it can be empty
//     image_logo: { type: String, required: true },
//     image1: { type: String, required: true },
//     image2: { type: String },
//     image3: { type: String },
// });

// // Example of adding an index on location if you query by location often
// eventspaceSchema.index({ location: 1 });

// module.exports = mongoose.model('Eventspace', eventspaceSchema);
