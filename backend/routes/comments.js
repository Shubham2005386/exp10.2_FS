const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');


// GET /api/comments/:postId - list comments for a post
router.get('/:postId', async (req, res) => {
const comments = await Comment.find({ post: req.params.postId }).populate('author', 'name avatarUrl').sort({ createdAt: 1 });
res.json(comments);
});


// POST /api/comments/:postId - add comment (protected)
router.post('/:postId', auth, async (req, res) => {
const { text } = req.body;
const comment = new Comment({ post: req.params.postId, author: req.user.id, text });
await comment.save();
const full = await comment.populate('author', 'name avatarUrl');
// For real-time updates you could emit via sockets here
res.status(201).json(full);
});


// DELETE /api/comments/:id - delete comment (protected, author only)
router.delete('/:id', auth, async (req, res) => {
const comment = await Comment.findById(req.params.id);
if (!comment) return res.status(404).json({ msg: 'Comment not found' });
if (comment.author.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
await comment.remove();
res.json({ msg: 'Deleted' });
});


module.exports = rou
