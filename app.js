const express = require('express');
const app = express();
const postManager = require('./routes/internal/posts')

const activities = require('./activities/scheduled_requests');

activities.dailyUpdate();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});