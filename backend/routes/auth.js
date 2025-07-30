const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user data
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Add to favorite
router.post('/favorites/add', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { countryCode } = req.body;
  
      if (!user.favoriteCountries.includes(countryCode)) {
        user.favoriteCountries.push(countryCode);
        await user.save();
      }
  
      res.json(user.favoriteCountries);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  // Remove from favorite
  router.post('/favorites/remove', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { countryCode } = req.body;
  
      user.favoriteCountries = user.favoriteCountries.filter(
        code => code !== countryCode
      );
      await user.save();
  
      res.json(user.favoriteCountries);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });


module.exports = router;