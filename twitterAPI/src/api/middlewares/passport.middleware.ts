import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import PassportJWT from 'passport-jwt';
import { KnownConfigKey } from '../../config/config';
import User, { IUser } from '../../models/user.model';


export function initPassport() {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { console.log('error');
        console.log(err);
          return done(err); }
        if (!user) { console.log('!user error');
          return done(null, false); }
        if (!user.validPassword(password)) { console.log('valid-password error');
          return done(null, false); }
        return done(null, user);
      });
    }));

  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KnownConfigKey.secret
  };
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = KnownConfigKey.secret;

  passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne({ _id: payload.user._id }, (err: Error, user: IUser) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
        // or you could create a new account
      });
    })
  );
}
