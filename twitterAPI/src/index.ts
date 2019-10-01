import app from './app';
import port from './app';

app.listen(app.get('port'), () => {
  console.log(`server running at ${port}`);
});
