import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

import express from 'express';
const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
  
    const user = await UserModel.findOne({ username })
    
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.password)
  
    if(user && !passwordCorrect) {
      console.log(password, passwordCorrect)
      return response.status(401).json({
          error: 'wrong password'
      })
    }
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username and password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h' })
  
    response
      .status(200)
      .send({ token, username: user.username, score: user.score })
})

export default loginRouter;