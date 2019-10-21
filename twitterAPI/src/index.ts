import app from './app';
import port from './app';
import { mongooseConnection } from './connection/mongoose-connection';

mongooseConnection();

app.listen(app.get('port'), () => {
  console.log(`server running at ${port}`);
});
