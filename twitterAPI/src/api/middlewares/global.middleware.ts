import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import { configureJWTStrategy } from './passport.middleware';

export const setGlobalMiddleware = (app: any) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(logger('dev'));
  app.use(passport.initialize({ userProperty: 'currentUser' }));
  configureJWTStrategy();
};