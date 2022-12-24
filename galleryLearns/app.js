var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const auth = require('./controllers/auth');
const checkAdmin = require('./controllers/checkAdmin');

const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.2kktyhz.mongodb.net/?retryWrites=true&w=majority`; 
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const moduleRouter = require('./routes/module');
const logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    cookie: { maxAge: oneDay, sameSite: 'lax' },
    resave: false,
    saveUninitialized:true,
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    store: MongoStore.create({
      mongoUrl: mongoDB,
    })
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);

app.use(checkAdmin);
app.use(auth);

app.use('/', indexRouter);
app.use('/module', moduleRouter);

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
