var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
//let session = require('express-session');
//let flash = require('express-flash');
//let sessionStore = new session.MemoryStore;
var logger = require('morgan');
let appConfig = require('./configs/app');

const admin = require('firebase-admin');
const {Storage} = require('@google-cloud/storage');
require('dotenv').config()

let serviceAccount = require('./aesthetic-fashion-4a9dd-firebase-adminsdk-nblcy-d58263a281.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DBURLFIREBASE
})

const storage = new Storage({
  keyFilename: serviceAccount,
});

// Auth0
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL,
};

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var shopsRouter = require('./routes/shops');
var workerIndex = require('./routes/admin_salesman/index');
var workerInventory = require('./routes/admin_salesman/inventory');
var workerSales = require('./routes/admin_salesman/sales');
var clientsRouter = require('./routes/clientes/index');
var usersRouter = require('./routes/admin_salesman/usuarios');
var tiendasAPIRouter = require('./routes/api/tiendas');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth(config));
/*
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());*/
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/shops', shopsRouter);
app.use('/admin_salesman', workerIndex);
app.use('/admin_salesman/inventory', workerInventory);
app.use('/admin_salesman/sales', workerSales);
app.use('/clientes', clientsRouter);
app.use('/admin_salesman/users', usersRouter);

// APIs
app.use('/api/tiendas', tiendasAPIRouter);


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
