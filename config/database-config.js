const mongoose = require('mongoose');

// require('dotenv').config();
// const conn = process.env.DB_STRING;

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


// === Sessions ===
// ================

// const sessionStore = new MongoStore({ 
//   mongooseConnection: connection, 
//   collection: 'sessions' 
// });

// app.use(session({
//   secret: 'some secret',
//   resave: false,
//   saveUninitialized: true,
//   store: sessionStore,
//   cookie: {
//       maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
//   }
// }));