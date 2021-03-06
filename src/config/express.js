const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('./config');
const routes = require('../index.route');
const session = require('express-session');
const createError = require('http-errors');
const path = require('path');

// passport dependencies
const passport = require('passport');
const flash = require('connect-flash');

const authRoutes = require('../server/auth/auth.route');

const app = express();

// required for passport
app.use(session({ secret: config.jwtSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS - Cross Origin Resource Sharing.
app.use(cors());

app.use('/', express.static('public'));

// Default every route except the above to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// Mount all routes on /api/v1 path.
app.use('/api/v1', routes);
app.use('/admin', authRoutes);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.send(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
