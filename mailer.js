const express = require('express');
const bcrypt = require('bcrypt');
const UserAcc = require('./models/user'); 
const transporter = require('./config/nodemailer'); 
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    
    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = new UserAcc({
      username,
      password: hashedPassword,
      email,
    });

    
    await newUser.save();

    
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Welcome to Your Website',
      text: 'Thank you for registering on our website!',
    });

    res.send('User registration successful! Check your email for a welcome message.');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;