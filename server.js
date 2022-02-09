const express = require('express');
const app = express();
const cors = require('cors');
const connectDatabase = require('./config/databaseConnection');
const users = require('./routes/users')
require('dotenv').config({path: __dirname + '/config/config.env'});

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.use(express.json());
app.use('/api/users', users);


connectDatabase();







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
