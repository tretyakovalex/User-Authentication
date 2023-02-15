const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../config/database-config');
const utils = require('../lib/utils');
const { set } = require('mongoose');

router.post('/register', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
  
    console.log(username);
  
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword
      });
  
    //   const result = await user.save();
        user.save()
        .then((user) => {
            const jwt = utils.issueJWT(user);

            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
        })
        console.log("User Registered!");
    //   res.status(201).json({ message: 'User registered!' });
    } catch (error) {
      console.error(error);
    }
  });
  
  router.post('/login', (req, res) => {
      const username = req.body.username;
      const password = req.body.password;
  
      console.log(username);
      // Check if the username exists in the database
      User.findOne({ username: username }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(401).send("Could not find user");
        }
  
        // Compare the password with the hash stored in the database
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) throw err;
          if (result) {
            const tokenObject = utils.issueJWT(user);
            console.log("Login successful");
            res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });
            // res.send("Login successful");
          } else {
            return res.status(401).send("Username or password is incorrect");
          }
        });
      });
  });

  router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    
    console.log("You are successfully authenticated to this route!");
    // const token = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2VhNjU4ZWJjOTFlNTNjZjhlMmEwZDYiLCJpYXQiOjE2NzYzMDU4MTM0MTIsImV4cCI6MTY3NjMwNTg5OTgxMn0.NYK4t4BBotBlZ6ORIOEV605P-mlipC0gaq09wv2cmTc25XtOnP6wTliH0gP5DCot5NYNJulYqQjGoJ79HUr8GftQvTp2nCt7u3ULf07NV1iPGgW246apcu2iTbE-iVbPFdtTX2jC-KF5wqmEgmNzcszMG2e7qbtVrSn2pw9nSuU_P6OLKSJwDZG_YZ0fRCxBFFZTZRuSZnf2CG1S7kD6ccwlz9Sz6TxtF5yl2OlID4SDRxm6XZ4hvwq5KTL6Sc8PggVHQLkMX5PyzHNZsfhoNwheS4ryCgm9WcfqPlYTfJ_nAIP75uTtufF3vf11q1QwPhc0upBqLQBkFtFD1bm6wu3nX6qnqqi9S9tlMR7srv5kp-JvWAwXjhY7Ha3k9w0H3134x4McHok4nmOL8QCHywBmdBP5iIAwPkujcsBOrFuLEhp6YCn2bqlL7mWl4YsOXdzYyxJ1Rys1os2aD075nOVcwEwk9W-1Ew7rXPfhrzSnyFKuIr5N1nDEH1WIk8VMZfPAeKK8tVc5ah8vwGHm2502gpqZIpXQ3wOabaRm_vWExOgL_wQL8u5Srgfza_Etz_didDO2THQH0HJ0wzsM7NkLdAms_hqg9mZoyHF6GsjyqObGS8uRxc0fGekXNEXBlFaaLVPL70PjqEB85QCygYli3Wc5y73_Sdt2gJOsaW4"
    // res.header('authentication', token);
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
  })


module.exports = router;