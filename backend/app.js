import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

import UserModel from './models/UserModel.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://juseljus:yPh5luuSiTN6mXes@higher-or-lower.cxdlf.mongodb.net/?retryWrites=true&w=majority&appName=higher-or-lower')

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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});