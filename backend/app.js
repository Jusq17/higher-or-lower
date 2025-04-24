import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


import loginRouter from './controllers/login.js';
import userRouter from './controllers/user.js';
import registerRouter from './controllers/register.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

const connection_url = process.env.MONGODB_URI;
console.log(connection_url);

mongoose.connect(connection_url);

app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/user', userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});