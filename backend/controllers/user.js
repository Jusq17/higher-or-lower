import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import getTokenFrom from '../utils/tokenFrom.js';

import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    
    // get all users from the database
    UserModel.find().then(users => {
        const usersInfo = users.map(user => {
            return {
                username: user.username,
                score: user.score,
            }
        });
        res.json(usersInfo);
    }).catch(err => {
        console.log(err);
    });
});

userRouter.get('/profile', (req, res) => {

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

userRouter.post('/score', (req, res) => {

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
            return res.json('Score updated');
          }).catch(err => {
            console.log(err);
          });
        }
      }
    }).catch(err => {
      console.log(err);
    });
  
    res.json('Score not updated');
  });

export default userRouter;