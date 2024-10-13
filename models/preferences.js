const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        ref: 'User'
    },
    categories: {
        type: [String],
        default: []
    },
    languages: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Preferences', PreferencesSchema);
