const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const getMetaData = require('metadata-scraper');

const app = express();

// CORS configuration to allow requests from specified origins
app.use(cors({
  origin: ['https://www.onemco.com.au', 'https://www.onemco.com','https://meta.onemco.com',  'http://localhost:5173'],
}));

// Route to fetch metadata for URLs
app.get('/:url(*)', async (req, res) => {
  try {
    const { url } = req.params;
    const fullUrl = 'https://' + url;
    
    // Fetch metadata using metadata-scraper module
    const metaData = await getMetaData(fullUrl);
    
    // Return the metadata as JSON response
    res.json(metaData);
  } catch (error) {
    console.error('Error fetching metadata:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
