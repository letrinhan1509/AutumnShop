var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var nodemailer = require('nodemailer');
const cors = require('cors');

const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const catalogRouter = require('./routes/catalog');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 }
}));
app.use(cors());

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/khach-hang', usersRouter);
app.use('/api/v1/danh-muc', catalogRouter);
app.use('/api/v1/san-pham', productRouter);
app.use('/api/v1/don-hang', orderRouter);
//app.use('/khuyen-mai', );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
