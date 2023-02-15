// Import necessary dependencies
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const passport = require('passport');

// Import configuration fro passport object

// Create express app
var app = express();
// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


// === Routes: ===
// ===============

app.use(require('./routes/user-routes'));


// === Server: ===
// ===============

app.listen(3000);