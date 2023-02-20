// Import necessary dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

// Import configuration for passport object
require('./config/passport')(passport);

// Create express app
var app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Initializing passport object on every request
app.use(passport.initialize());

// Routes setup
app.use(require('./routes/user-routes'));

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Server
app.listen(PORT, () => {
    console.log(`listening on port:${PORT}`);
});