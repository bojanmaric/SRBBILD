var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter=require('./routes/posts');
var catalogRouter=require('./routes/catalogs');
var imageRouter=require('./routes/images');


const mongoose= require('mongoose');
const config=require('./config/database')


var app = express();
mongoose.connect(config.database,{
  useNewUrlParser:true
}, function(error){
  if(error){
    console.log(error)
  }else{
    console.log("Conected to srbijankaDB")
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts',postRouter);
app.use('/api/catalogs',catalogRouter);
app.use('/api/images',imageRouter);


app.get('**',(req,res)=>{
  res.sendFile(__dirname+'/public/index.html');
})

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
