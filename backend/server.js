const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: 'https://panto-one.vercel.app', credentials: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'https://panto.onrender.com/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      profile.accessToken = accessToken;
      return done(null, profile);
    }
  )
);

app.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('https://panto-one.vercel.app/repos');
  }
);

app.get('/repos', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { accessToken } = req.user;

  require('axios')
    .get('https://api.github.com/user/repos', {
      headers: { Authorization: `token ${accessToken}` },
    })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(5005, () => console.log('Server running on https://panto.onrender.com'));
