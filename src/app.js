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

const corsOptions = {
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  credentials: true,                      // Allow sending credentials (cookies, HTTP authentication)
};
app.use(cors(corsOptions))

const sign_up_router = require('./routes/sign-up');
const login_router = require('./routes/login');
const posts_router = require('./routes/posts');
const comments_router = require('./routes/comments')
const authenticateToken = require('./middlewares/authenticateToken');
const profile_router = require('./routes/profile');
const path = require('path')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../uploads')));
console.log(path.join(__dirname, '../uploads'))


const { v4: uuidv4 } = require('uuid');

app.use((req, res, next) => {
  if (!req.cookies.userId) {
      const userId = uuidv4();
      res.cookie('userId', userId, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
          sameSite: 'Strict', // To avoid issues with cross-site requests
      });
  }
  next();
});

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




app.listen(4001, (req,res) => {

})