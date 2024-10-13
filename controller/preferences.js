const Preferences = require('../models/preferences');

// GET user preferences
const getPreferences = async (req, res) => {
    try {
        const name = req.userName;
        const preferences = await Preferences.findOne({ name });

        if (!preferences) {
            return res.status(404).json({ message: 'Preferences not found' });
        }

        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving preferences' });
    }
};

// PUT to update user preferences
const updatePreferences = async (req, res) => {
    try {
        const name = req.userName;
        const { categories, languages } = req.body;

        let preferences = await Preferences.findOne({ name });

        if (!preferences) {
            preferences = new Preferences({ name, categories, languages });
        } else {
            preferences.categories = categories;
            preferences.languages = languages;
        }

        await preferences.save();
        res.status(200).json(preferences);
    } catch (error) {
        res.status(500).json({ message: 'Error updating preferences' });
    }
};

module.exports = { getPreferences, updatePreferences };
