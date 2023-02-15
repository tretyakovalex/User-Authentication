const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const conn = "mongodb+srv://karlem:9TDMmeiHYQM7Vk1W@cluster0.5kwtewm.mongodb.net/Test";

const connection = mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// === User Schema ===
// ===================

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;