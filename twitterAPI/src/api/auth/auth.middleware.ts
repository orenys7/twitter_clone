import passport from 'passport';
import { IUser } from '../../models/user.model';
import { Request, Response, NextFunction } from 'express';

export function authenticate() {
  return passport.authenticate('jwt', {session: false});
}

export function authorize() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()){
      console.log('isAuthenticated');
      console.log(req.isAuthenticated());
      res.sendStatus(401);
    }
    const user = req.user as IUser;
    next();
  };
}
