const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.static('public'))
var cors = require('cors')
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors())

const sign_up_router = require('./routes/sign-up');
const login_router = require('./routes/login');
const posts_router = require('./routes/posts');
const comments_router = require('./routes/comments')
const authenticateToken = require('./middlewares/authenticateToken');
const profile_router = require('./routes/profile');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

app.get('/', (req,res) => {
    res.send("hi");
})

app.use('/sign-up',sign_up_router);
app.use('/login', login_router);
app.use('/posts', posts_router);
app.use('/comments', comments_router)
app.use('/profile', profile_router);

app.get('/protected', authenticateToken, (req,res) => {
    res.send("this is secret");
})

passport.use(
    new LocalStrategy((username, password, done) => {
      // get user from database
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // Compare hashed passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });
    })
  );

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
//   const user = users.find((u) => u.id === id);
  done(null, user);
});




app.listen(4000, (req,res) => {

})