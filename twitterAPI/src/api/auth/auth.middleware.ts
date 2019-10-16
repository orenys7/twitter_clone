import passport from 'passport';
import { IUser } from '../../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';

export function authenticate() {
  return passport.authenticate('jwt', {session: false});
}

export function verifyJwtToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.query.token = bearerToken;
    next();
  }
  else {
    return res.status(UNAUTHORIZED).json('Unauthorized');
  }
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
