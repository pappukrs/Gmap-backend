const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = 3000;

app.use(cors());

// // Initial location and direction
// let latitude = 17.385044;
// let longitude = 78.486671;

// Initial location and direction
let latitude = 21.245990;
let longitude = 81.389395;

const latitudeIncrement = 0.00001; // Change in latitude per step
const longitudeIncrement = 0.00001; // Change in longitude per step

const generateRandomLocation = () => {
    // Simulate a location change in a straight line
    latitude += latitudeIncrement;
    longitude += longitudeIncrement;
    
    // Create a location object
    return {
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
        timestamp: new Date().toISOString()
    };
};

const sendLocation = () => {
    const location = generateRandomLocation();
    io.emit('vehicleLocation', location);
    io.emit('alka', {"course":"IT","clg":"BIT-D"});
};

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

setInterval(sendLocation, 10); 

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
