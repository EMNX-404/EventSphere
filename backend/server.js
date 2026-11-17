const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes'); 
const boothRoutes = require('./routes/boothRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Wrap Express with HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Listen for connections
io.on('connection', (socket) => {
  console.log(`User connected to WebSockets: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Middleware to make 'io' available inside all your controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes); 
app.use('/api/booths', boothRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});