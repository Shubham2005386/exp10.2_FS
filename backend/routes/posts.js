const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');


// GET /api/posts - list posts
router.get('/', async (req, res) => {
const posts = await Post.find().populate('author', 'name avatarUrl').sort({ createdAt: -1 });
res.json(posts);
});


// POST /api/posts - create post (protected)
router.post('/', auth, async (req, res) => {
const { title, body, tags } = req.body;
const post = new Post({ author: req.user.id, title, body, tags });
await post.save();
res.status(201).json(post);
});


// PUT /api/posts/:id - update (protected, only author)
router.put('/:id', auth, async (req, res) => {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ msg: 'Post not found' });
if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
Object.assign(post, req.body);
await post.save();
res.json(post);
});


// DELETE /api/posts/:id - delete (protected, only author)
router.delete('/:id', auth, async (req, res) => {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ msg: 'Post not found' });
if (post.author.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
await post.remove();
res.json({ msg: 'Deleted' });
});


module.exports = router;
