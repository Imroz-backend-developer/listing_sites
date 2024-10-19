const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error'); // Ensure the path is correct
require('dotenv').config(); // Load environment variables

// Import routes
const authRoutes = require('./routes/authroutes');
const userRoutes = require('./routes/userroutes');
const jobTypeRoutes = require('./routes/jobtyperoutes');
const jobRoutes = require('./routes/Jobsroutes');
const adminRoutes = require('./routes/adminroutes');

// Create Express app
const app = express();

// Database connection
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error:', err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());

// CORS configuration
// Configure CORS options
const corsOptions = {
    origin: ['https://listing-sites-8a43.vercel.app'], // Replace with your frontend URL
    methods: ['GET, POST, PUT, DELETE, OPTIONS'],
    credentials: true, // Allow credentials if needed (e.g., cookies, HTTP authentication)
};

app.use(cors(corsOptions)); // Apply CORS configuration

// Route middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobRoutes);
app.use('/api', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Server port
const PORT = process.env.Port || 5000; // Default to port 5000 if not specified
app.listen(PORT, () => {
    console.log(`Server is running on port: ${Port}`);
});
