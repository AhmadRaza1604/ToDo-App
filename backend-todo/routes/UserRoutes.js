// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "Ahmad";



  router.post('/signup', async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.status(400).json({ message: 'Email address already in use' });
    }
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ message: 'UserName already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
    try {
            const user= await User.findOne({ username: req.body.username });
            
                  if(!user){
                    return res.status(401).json({ message: 'User not found!' });
                }
              
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password!' });
            }
            const token = jwt.sign({ userId: user._id, username: user.username, userEmail:user.email, fname:user.fname, lname:user.lname }, secretKey, {
                expiresIn: '30m',
            });
    
            res.json({ message: 'Login successful', token });
        
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
);

module.exports = router;