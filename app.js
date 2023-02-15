// Import necessary dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

// Import configuration for passport object
require('./config/passport')(passport);

// Create express app
var app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Initializing passport object on every request
app.use(passport.initialize());

// Routes setup
app.use(require('./routes/user-routes'));

// Server
app.listen(3000);