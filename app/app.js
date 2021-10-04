const compression = require('compression');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const winston = require('./res/winston');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Routes
const recordingsRouter = require('./routes/recordings/recordings');
const featuresRouter = require('./routes/features/features');
const authRouter = require('./routes/auth/auth');
const dashRouter = require('./routes/dash/dash');

const app = express();
app.use(compression());
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({limit: '2mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.resolve("./") + "/build"));
app.use(morgan('combined', {stream: winston.stream}));
app.use('/api', recordingsRouter);
app.use('/api', featuresRouter);
app.use('/api', authRouter);
app.use('/api/dash', dashRouter);

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname });
  });
}

module.exports = app;
