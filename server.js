const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Route to handle saving time
app.post('/save-time', (req, res) => {
    const datetime = req.body.datetime;
    const filePath = path.join(__dirname, 'saved-time.txt');

    // Append datetime to file
    fs.appendFile(filePath, `${datetime}\n`, err => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ success: false });
        }
        res.json({ success: true });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
