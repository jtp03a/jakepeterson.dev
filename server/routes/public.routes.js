const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Contact = require('../models/contact.model');
const jwtDecode = require('jwt-decode');
const { createToken, hashPassword, verifyPassword } = require('./../utilities');

router.post('/auth/login', async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({
      username
    }).lean();

    if (!user) {
      console.log('Email not found');
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.password
    );

    if (passwordIsValid) {
      const { password, ...rest } = user;

      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(userInfo);

      const tokenDecoded = jwtDecode(token);
      const tokenExpiration = tokenDecoded.exp;

      res.cookie('token', token, {
        httpOnly: true
      });

      res.json({
        message: 'Authentication successful',
        token,
        userInfo,
        tokenExpiration
      });
    } else {
      res.status(403).json({ message: 'Wrong email or password' });
      console.log('Wrong email or password');
    }
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
    console.log(err);
  }
});

router.post('/auth/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, username } = req.body

    const hashedPassword = await hashPassword(req.body.password);

    const userData = {
      email: email.toLowerCase(),
      firstname,
      lastname,
      username,
      password: hashedPassword,
      role: 'admin'
    };

    const existingEmail = await User.findOne({
      email: userData.email,
    }).lean();

    const existingUsername = await User.findOne({
      username: userData.username
    }).lean();

    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    if(existingUsername) {
      return res.status(400).json({ message: 'Username already exists'});
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = createToken(savedUser);
      const tokenDecoded = jwtDecode(token);
      const tokenExpiration = tokenDecoded.exp;

      const {
        firstname,
        lastname,
        email,
        role,
        username
      } = savedUser;

      const userInfo = {
        firstname,
        lastname,
        email,
        role,
        username
      };

      res.cookie('token', token, { httpOnly: true });

      return res.json({
        message: 'User created',
        token,
        userInfo,
        tokenExpiration
      })
    } else {
      return res.status(400).json({ message: 'There was a problem creating your account' })
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'There was a problem creating your account' });
  }
})

router.post('/contact', async (req, res) => {
  try {
     const newContact = new Contact({
       firstname: req.body.firstname,
       lastname: req.body.lastname,
       email: req.body.email,
       message: req.body.message,
       responded: false
     })
     const savedContact = await newContact.save();
     res.send({ message: 'Your contact info was successfully submitted'})
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'There was a problem submitting your contact info '});
  }
})

module.exports = router;
