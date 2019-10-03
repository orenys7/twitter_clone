import express from 'express';
import { Request, Response, NextFunction } from 'express';
// import fs from 'fs';
// import path from 'path';
// import morgan from 'morgan';
import mongoose from 'mongoose';
import { restRouter } from './api';
import { devConfig } from './config/env/dev';
import { setGlobalMiddleware } from './api/middlewares/global.middleware';



mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${devConfig.database}`,
  () => console.log('connected to DB')
);
const app = express();
export const port: number = +devConfig.port || 3000;
app.set('port', port);

// set midllewares
setGlobalMiddleware(app);

app.use('/api',restRouter);
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});








// // set midllewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // set the log file.

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, './logs/access.log'),
//   { flags: 'a' }
// );
// console.log(__dirname);

// // register morgan to be my logger.
// app.use(morgan('combined', { stream: accessLogStream }));

// mongoose.connect(
//   devConfig.database,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => console.log('connected to DB')
// );

// app.use(router);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

export default app;
