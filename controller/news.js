const axios = require('axios');
const Preferences = require('../models/preferences');

const fetchNews = async (req, res) => {
    try {
        const name = req.userName;

        // Get user preferences
        const preferences = await Preferences.findOne({ name });

        if (!preferences) {
            return res.status(404).json({ message: 'User preferences not found' });
        }

        // Build API query parameters based on preferences
        const categories = preferences.categories.join(',');
        const languages = preferences.languages.join(',');

        const apiKey = process.env.NEWS_API_KEY;
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                category: categories,
                language: languages,
                apiKey: apiKey,
            },
        });

        if (!response.data.articles.length) {
            return res.status(404).json({ message: 'No articles found based on preferences' });
        }

        res.status(200).json(response.data.articles);
    } catch (error) {
        console.error('Error fetching news:', error.message);

        if (error.response) {
            res.status(error.response.status).json({ message: error.response.data.message });
        } else {
            res.status(500).json({ message: 'Error fetching news' });
        }
    }
};

module.exports = { fetchNews };
