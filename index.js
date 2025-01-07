const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get("/docs", (req, res) => res.sendFile(path.join(__dirname, 'public', 'docs.html')));
app.get("/apis", (req, res) => res.sendFile(path.join(__dirname, 'public', 'apis.html')));
app.get("/down", (req, res) => res.sendFile(path.join(__dirname, 'public', 'dl.html')));


app.get('/dl', async (req, res) => {
    const { url } = req.query;  

    
    if (!url) {
        return res.status(400).json({ error: 'The "url" query parameter is required.' });
    }

    try {
        
        const response = await axios.get('https://nayan-video-downloader.vercel.app/alldown?url=' + encodeURIComponent(url));

        
        if (response.data.data) {
            return res.json({Author: "IMRAN AHMED", data: response.data.data});
        } else {
            return res.status(500).json({ error: 'Error communicating with the external API' });
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Failed to get response from external API' });
    }
});

// Start the Express server on port 3000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
