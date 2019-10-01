import passport from 'passport';
import passportLocal  from 'passport-local';
import mongoose from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
const user = mongoose.model('User');

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    user.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
    });
}));