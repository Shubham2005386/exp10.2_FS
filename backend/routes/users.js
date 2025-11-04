const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');


// GET /api/users/me
router.get('/me', auth, async (req, res) => {
const user = await User.findById(req.user.id).select('-password');
res.json(user);
});


// GET /api/users/:id (public profile)
router.get('/:id', async (req, res) => {
const user = await User.findById(req.params.id).select('-password');
if (!user) return res.status(404).json({ msg: 'User not found' });
res.json(user);
});


module.exports = router;
