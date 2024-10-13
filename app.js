require("dotenv").config();
const express = require('express');
const authMiddleware = require('./middleware/auth');
const preferencesRoutes = require('./routes/preferences');
const newsRoutes = require('./routes/news');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
})

// Routes
app.use('/api/v1/users',userRouter);
app.use('/api/v1/preferences', preferencesRoutes);
app.use('/api/v1/news', newsRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
