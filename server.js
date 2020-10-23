const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

//Express Server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database thru Heroku/local database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//Link Routes
app.use(require('./routes/api-routes'));
app.use(require('./routes/html-routes'));

// Server Start
app.listen(PORT, function() {
  console.log(`Server listening on: http://localhost:${PORT}`);
});