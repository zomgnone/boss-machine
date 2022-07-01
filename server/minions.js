const express = require('express');
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');

// Check for correct ID
minionsRouter.param('id', (req, res, next, id) => {
  try {
    const singleMinion = getFromDatabaseById('minions', id);
    if (!singleMinion) {
      res.status(404).send('Minion not found');
    } else {
      req.minion = singleMinion;
      next();
    }
  } catch(error) {
    next(error);
  }
})


// Get all minions
minionsRouter.get('/', (req, res, next) => {
  const minionsArray = getAllFromDatabase('minions');
  res.send(minionsArray);
});

// Get a single minion by id
minionsRouter.get('/:id', (req, res, next) => {
  res.send(req.minion);
});

// Create new minion
minionsRouter.post('/', (req, res, next) => {
  const newMinion = req.body;
  // Add new minion to the database, receive new object with proper ID.
  try {
    const newMinionWithId = addToDatabase('minions', newMinion);
    res.status(201).send(newMinionWithId);
    } catch (error) {
      next(error);
    }
});

// Edit minion
minionsRouter.put('/:id', (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.status(200).send(updatedMinion);
});

// Delete minion
minionsRouter.delete('/:id', (req, res, next) => {
  const deleteMinion = deleteFromDatabasebyId('minions', req.params.id);
  if (deleteMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

// Error handling
minionsRouter.use('/', (err, req, res, next) => {
  res.status(err.status || 400).send(err.message);
});

module.exports = minionsRouter;