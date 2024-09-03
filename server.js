const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Use CORS to allow requests from the frontend
app.use(cors());

// Serve the static HTML file
app.use(express.static(path.join(__dirname, '/')));

// Endpoint to search for a recipe by name
app.get('/search', async (req, res) => {
    const query = req.query.q;

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from TheMealDB API' });
    }
});

// Serve the index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
