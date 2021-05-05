const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');
const Post = require('../models/post.model');
const jwtDecode = require("jwt-decode");


//Private routes for managing contacts
router.get('/contacts', async (req, res) => {
    try {
        const foundContacts = await Contact.find();
        res.send(foundContacts);
    } catch (err) {
        console.log(err);
    }
});

router.patch('/contacts/responded/:id', async (req, res) => {
    try {
        const foundContact = await Contact.findOneAndUpdate({
            _id: req.params.id
        }, { $set: { responded: true } }
        );
        res.send('Contact marked responded');
    } catch (err) {
        console.log(err);
    }
})

router.delete('/contacts/delete/:id', async (req, res) => {
    try {
        const foundlog = await Contact.findOneAndDelete({
            _id: req.params.id
        });
        res.send('Contact Deleted')
    } catch (err) {
        console.log(err);
    }
});

//Private routes for managing blog posts
router.get('/posts/all', async (req, res) => {
    try {
        const foundPosts = await Post.find().sort({date: 'desc'})
        res.send(foundPosts);
    } catch (err) {
        console.log(err);
    }
  });

router.post('/posts', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Authentication Invalid" });
    }
  
    const decodedToken = jwtDecode(token);
  
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "There was a problem authorizing the request" });
    } else {
      req.user = decodedToken;
    }
    
    const { sub } = req.user;
    try {
        console.log(sub)
        const newPost = new Post({
            postTitle: req.body.postTitle,
            post: req.body.post,
            postImage: req.body.postImage,
            date: new Date(),
            author: sub,
            tags: req.body.tags
        })
        const savedPost = await newPost.save();
        res.send({ message: 'Your post successfully submitted' })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'There was a problem submitting your post' });
    }
})

router.patch('/posts/update/:id', async (req, res) => {
    try {
        const foundPost = await Post.findOneAndUpdate({
            _id: req.params.id
        }, { $set: { 
            postTitle: req.body.postTitle,
            post: req.body.post,
            postImage: req.body.postImage,
            date: new Date(),
            tags: req.body.tags 
        } }
        );
        res.send({ message: 'Your post successfully updated' })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: 'There was a problem updating your post' });
    }
})

router.delete('/posts/delete/:id', async (req, res) => {
    try {
        const foundPost = await Post.findOneAndDelete({
            _id: req.params.id
        });
        res.send('Post Deleted')
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;