const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const auth = require('../middleware/auth');

// @route   POST /api/interviews
// @desc    Create a new interview
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { company, position, experience, questions, tips, difficulty, outcome, interviewDate } = req.body;
    
    const newInterview = new Interview({
      user: req.user.id,
      company,
      position,
      experience,
      questions,
      tips,
      difficulty,
      outcome,
      interviewDate
    });
    
    const interview = await newInterview.save();
    
    // Populate user details
    await interview.populate('user', 'name avatar');
    
    res.json(interview);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/interviews
// @desc    Get all interviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(interviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/interviews/:id
// @desc    Get interview by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('user', 'name avatar email');
    
    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }
    
    res.json(interview);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Interview not found' });
    }
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET /api/interviews/user/:userId
// @desc    Get interviews by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const interviews = await Interview.find({ user: req.params.userId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    
    res.json(interviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE /api/interviews/:id
// @desc    Delete interview
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({ msg: 'Interview not found' });
    }
    
    // Check if user owns the interview
    if (interview.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    
    await interview.deleteOne();
    
    res.json({ msg: 'Interview removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;