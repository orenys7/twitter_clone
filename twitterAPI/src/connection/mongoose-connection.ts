import mongoose from 'mongoose';
import { KnownConfigKey } from '../config/config';

export function mongooseConnection() {
    mongoose.Promise = global.Promise;
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.connect(KnownConfigKey.DbServerUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log('connected to DB')
    );
}
