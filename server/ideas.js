const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');


// Check for correct ID
ideasRouter.param('id', (req, res, next, id) => {
  try {
    const singleIdea = getFromDatabaseById('ideas', id);
    if (!singleIdea) {
      res.status(404).send();
    } else {
      req.idea = singleIdea;
      next();
    }
  } catch(error) {
    next(error);
  }
})

// Get all ideas
ideasRouter.get('/', (req, res, next) => {
  const ideasArray = getAllFromDatabase('ideas');
  res.send(ideasArray);
});

// Get a single idea by id
ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

// Create new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  // Add new idea to the database, receive new object with proper ID.
  try {
    const newIdeaWithId = addToDatabase('ideas', newIdea);
    res.status(201).send(newIdeaWithId);
    } catch (error) {
      next(error);
    }
});

// Edit idea
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// Delete idea
ideasRouter.delete('/:id', (req, res, next) => {
  const deleteIdea = deleteFromDatabasebyId('ideas', req.params.id);
  if (deleteIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
})

// Error handling
ideasRouter.use('/', (err, req, res, next) => {
  res.status(err.status || 400).send(err.message);
});

module.exports = ideasRouter;