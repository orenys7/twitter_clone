import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import PassportJWT from 'passport-jwt';
import { devConfig } from '../../config/env/dev';
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
    secretOrKey: devConfig.secret
  };
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = devConfig.secret;

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



// const LocalStrategy = passportLocal.Strategy;
// const user = mongoose.model('User');

// passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//         user.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(undefined, false, { message: `Email ${email} not found.` });
//             }
//             user.comparePassword(password, (err: Error, isMatch: boolean) => {
//                 if (err) { return done(err); }
//                 if (isMatch) {
//                     return done(undefined, user);
//                 }
//                 return done(undefined, false, { message: "Invalid email or password." });
//             });
//         });
//     }));