const express = require('express');
const app = require('../server');
const minionsRouter = require('./minions');
const meetingsRouter = require('./meetings');
const ideasRouter = require('./ideas');
const apiRouter = express.Router();

// logging
if (process.env.NODE_ENV !== 'test') {
  const morgan = require('morgan');
  apiRouter.use('/minions', morgan('dev'));
}

// Minions API
apiRouter.use('/minions/', minionsRouter);

// Meetings API
apiRouter.use('/meetings/', meetingsRouter);

// Ideas API
apiRouter.use('/ideas/', ideasRouter);

module.exports = apiRouter;
