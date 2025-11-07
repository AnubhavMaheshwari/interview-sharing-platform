const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /auth/google
// @desc    Authenticate with Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /auth/google/callback
// @desc    Google callback
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: process.env.CLIENT_URL + '/login'
  }),
  (req, res) => {
    // Create JWT payload
    const payload = {
      user: {
        id: req.user.id
      }
    };
    
    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        // Redirect to frontend with token
        res.redirect(`${process.env.CLIENT_URL}?token=${token}`);
      }
    );
  }
);

// @route   GET /auth/user
// @desc    Get logged in user
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-googleId');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /auth/logout
// @desc    Logout user
router.get('/logout', (req, res) => {
  res.json({ msg: 'Logged out successfully' });
});

module.exports = router;