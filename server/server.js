const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Passport Config
require('./config/passport')(passport);

// Middleware - UPDATED CORS CONFIGURATION
// Middleware - UPDATED CORS CONFIGURATION
const allowedOrigins = [
  process.env.CLIENT_URL,           // Production URL from environment
  'http://localhost:3000',          // Local development
  'http://localhost:3001',          // Alternative local port
  'http://localhost:4000',          // ✅ Add this line for your running frontend
  'https://interview-sharing-platform.vercel.app', // ✅ Deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser tools
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin); // helpful for debugging
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.options('*', cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session middleware (required for passport)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/api/interviews', require('./routes/interviews'));

// Test route
app.get('/', (req, res) => {
  res.json({ msg: 'Interview Sharing API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});