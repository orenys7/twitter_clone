import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { config } from './config';
import router from './routes';

const app = express();

// @ts-ignore
export const port: number = +process.env.PORT || 3000;

app.set('port', port);

// set midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set the log file.

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, './logs/access.log'),
  { flags: 'a' }
);
console.log(__dirname);

// register morgan to be my logger.
app.use(morgan('combined', { stream: accessLogStream }));

mongoose.connect(
  config.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to DB')
);

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;
