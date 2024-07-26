const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/vehicle-data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data');
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
