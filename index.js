const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mentorStudentDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
