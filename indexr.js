const express = require('express');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
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

let vehicleData = [];
fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading data', err);
    } else {
        vehicleData = JSON.parse(data);
    }
});

let index = 0;
const sendLocation = () => {
    if (index < vehicleData.length) {
        io.emit('vehicleLocation', vehicleData[index]);
        io.emit('alka', {"course":"IT","clg":"BIT-D"});
        index++;
    } else {
        index = 0; 
    }
};

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

setInterval(sendLocation, 50); 

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
