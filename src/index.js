require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://KingBlacc:Qwerty9AD!@airbnb-database-wf9gf.mongodb.net/track?retryWrites=true&w=majority';
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
  console.error('Error connecting to mongo', err);
});

app.get('/', () => {
  res.send('Hello there');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
