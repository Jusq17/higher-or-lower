import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from './models/UserModel.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection_url = process.env.MONGODB_URI;
console.log(connection_url);

mongoose.connect(connection_url);

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

app.get('/profile', (req, res) => {

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  const username = decodedToken.username

  UserModel.findOne({ username }).then(user => {

    const userInfo = {
      username: user.username,
      score: user.score,
    }

    res.json(userInfo);
  }).catch(err => {
    console.log(err);
  });
});

app.post('/register', (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;
  const score = req.body.score;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new UserModel({
    username,
    password: hash,
    score
  });

  newUser.save().then(() => {
    res.send('User registered');
  }).catch(err => {
    console.log(err);
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);

  const username = req.body.username;
  const password = req.body.password;

  UserModel.findOne({ username }).then(user => {
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (isPasswordCorrect) {

        const token = jwt.sign({
          username: user.username,
        }, 
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        });

        res.status(200).json({
          token,
          username: user.username,
        });
      }
      else {
        // Unauthorized 401
        res.status(401).json({
          message: 'Login failed',
        });
      }
    } else {
      // User not found 404
      res.status(404).json({
        message: 'User not found',
      });
    }
  });
});

app.post('/score', (req, res) => {

  console.log(req.body);

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  const username = decodedToken.username

  // find the user by username and update the score if the new score is higher

  UserModel.findOne({ username }).then(user => {

    // if the user exists
    if (user) {

      const newScore = req.body.score;

      // if the new score is higher than the old score
      if (newScore > user.score) {

        // update the score
        UserModel.updateOne({ username }, { score: newScore }).then(() => {
          res.send('Score updated');
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }).catch(err => {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});