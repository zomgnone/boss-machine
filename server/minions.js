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

// Get work for a minion
minionsRouter.get('/:id/work', (req, res, next) => {
  const minionWork = getAllFromDatabase('work').filter(work => work.minionId === req.params.id);
  res.send(minionWork);
});

minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send('Work not found');
  }
});

// Edit work of a minion
minionsRouter.put('/:id/work/:workId', (req, res, next) => {
  const editedWork = updateInstanceInDatabase('work', req.body);
  res.send(editedWork);
});


// Create new work for a minion
minionsRouter.post('/:id/work', (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.id;
  const workAdded = addToDatabase('work', newWork);
  if (workAdded) {
    res.status(201).send(workAdded);
  } else {
    res.status(500).send();
  }
});

// Delete work for a minion
minionsRouter.delete('/:id/work/:workId', (req, res, next) => {
  const deleteStatus = deleteFromDatabasebyId('work', req.params.workId);
  if (deleteStatus) {
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