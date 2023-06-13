const express = require('express');
const app = express();
const postManager = require('./routes/internal/posts')

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});