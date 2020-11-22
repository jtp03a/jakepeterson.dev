const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
  postTitle: { type: String, required: true },
  post: { type: String },
  postImage: { type: String, required: true },
  date: { type: Date, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  tags: [ 
      { tagName: { type: String } }
    ]
});

module.exports = mongoose.model('post', postModel);