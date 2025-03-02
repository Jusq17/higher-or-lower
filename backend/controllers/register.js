import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

import express from 'express';
const registerRouter = express.Router();

registerRouter.post('/', (req, res) => {
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

export default registerRouter;