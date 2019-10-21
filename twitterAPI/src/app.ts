import express from 'express';
// import fs from 'fs';
import path from "path";
// import morgan from 'morgan';
import mongoose from 'mongoose';
import router from './routes/index';
import { KnownConfigKey } from './config/config';
import { setGlobalMiddleware } from './middlewares/global.middleware';

const app = express();
export const port: number = +KnownConfigKey.port || 3000;
app.set('port', port);

// set midllewares
setGlobalMiddleware(app);

app.use('', router);

export default app;
