const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
title: { type: String, required: true },
body: { type: String, required: true },
tags: [String]
}, { timestamps: true });


module.exports = mongoose.model('Post', PostSchema);  
