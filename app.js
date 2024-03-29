const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CSS Files
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')));
app.use('/owl-carousel', express.static(path.join(__dirname,'node_modules/owl.carousel/dist/assets/')));

// JS Files
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')));
app.use('/bootstrap_js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js/')));
app.use('/owl-carousel_js', express.static(path.join(__dirname, 'node_modules/owl.carousel/dist/')));
app.use('/preloader_js', express.static(path.join(__dirname, 'public/js/preloader/')));

// Images Files
app.use('/images', express.static(path.join(__dirname, 'public/images/')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
