var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var shopsRouter = require('./routes/shops');
var workerIndex = require('./routes/admin_salesman/index');
var workerInventory = require('./routes/admin_salesman/inventory');
var workerSales = require('./routes/admin_salesman/sales');
var clientsRouter = require('./routes/clientes/index');

// APIs
var inventarioAPIRouter = require('./routes/api/inventario');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/shops', shopsRouter);
app.use('/admin_salesman', workerIndex);
app.use('/admin_salesman/inventory', workerInventory);
app.use('/admin_salesman/sales', workerSales);
app.use('/clientes', clientsRouter);

// APIs
app.use('/api/inventario', inventarioAPIRouter);


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
