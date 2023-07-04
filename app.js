const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const activities = require('./activities/scheduled_requests');

require('dotenv').config();


app.set("port", process.env.PORT || 3000);

activities.dailyUpdate();

require("./utils/app/manager/index");

app.get('/', (req,res)=> {
  res.sendFile(path.join(__dirname,'index.html'));
})
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

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});