import passport from 'passport';
import PassportJWT from 'passport-jwt';
// import passportLocal from 'passport-local';
// import mongoose from 'mongoose';
import { devConfig } from '../../config/env/dev';
import User from '../../models/user.model';


export const configureJWTStrategy = () =>{
    const opts = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secret: devConfig.secret
    };
    // opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts.secret = devConfig.secret;

    passport.use(
        new PassportJWT.Strategy(opts, (payload, done) => {
            User.findOne({ _id: payload.id }, (err, user) => {
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