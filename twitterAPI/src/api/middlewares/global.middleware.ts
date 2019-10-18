import express from 'express';
import { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { initPassport } from './passport.middleware';

export const setGlobalMiddleware = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/assets', express.static(__dirname + '/store'));
  app.use(logger('dev'));


  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    error.message = 'Invalid route';
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  });

  app.use(passport.initialize({ userProperty: 'currentUser' }));
  initPassport();
};