import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import loginRouter from './controllers/login.js';
import userRouter from './controllers/user.js';
import registerRouter from './controllers/register.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection_url = process.env.MONGODB_URI;
console.log(connection_url);

mongoose.connect(connection_url);

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});