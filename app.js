// const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rfs = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');

// const authenticator = require('./src/middlewares/authenticator');
const {formatQuery} = require('./src/middlewares/formatQuery');
// const postRouter = require('./src/routes/post');
const benhnhanRouter = require('./src/routes/benhnhan');
const lamsangRouter = require('./src/routes/lamsang');
const tutheodoiRouter = require('./src/routes/tutheodoi');
const ytaRouter = require('./src/routes/yta');


const app = express();
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const logDirectory = path.join(__dirname, 'logs');
 
// Ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});

app.use(helmet());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(formatQuery());



// app.use(authenticator.auth);
// app.use(postRouter);
app.use('/benhnhan', benhnhanRouter);
app.use('/lamsang', lamsangRouter);
app.use('/tutheodoi', tutheodoiRouter);
app.use('/yta', ytaRouter);



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

module.exports = app;
