const express = require('express');
const { forcedUpdate } = require('./manager/index');
const router = express.Router();

require("./manager/index")

router.get('/twitter/:id/update', (req,res) => {
  axios.get(`${process.env.TWITTER_PROXY_URL}/posts/${req.params.id}`)
    .then(response => {
      forcedUpdate(req.params.id, response.data);
    })
})

router.get('/user/:id', (req, res) => {
  // axios.get(`${process.env.USER_MANAGER_URL}/`)
  res.statusCode = 404
  res.send();
})