const express = require('express');
const meetingsRouter = express.Router();
const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase
} = require('./db');

// Get all meeetings
meetingsRouter.get('/', (req, res, next) => {
  const meetingsArray = getAllFromDatabase('meetings');
  res.send(meetingsArray);
});

// Create new meeting
meetingsRouter.post('/', (req, res, next) => {
  const newMeetingWithId = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeetingWithId);
});

// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
  const deleteResult = deleteAllFromDatabase('meetings');
  res.status(204).send();
})

module.exports = meetingsRouter;