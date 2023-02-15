const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../config/database-config');
const utils = require('../lib/utils');

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
  
        user.save()
        .then((user) => {
            const jwt = utils.issueJWT(user);

            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires})
        })
        console.log("User Registered!");
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
          } else {
            return res.status(401).send("Username or password is incorrect");
          }
        });
      });
  });

  router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
  })


module.exports = router;