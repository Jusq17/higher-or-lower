import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';

import UserModel from './models/UserModel.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection_url = process.env.MONGODB_URI;
console.log(connection_url);

mongoose.connect(connection_url);

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
        res.send('Login successful');
      } else {
        res.send('Login failed');
      }
    } else {
      res.send('User not found');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});