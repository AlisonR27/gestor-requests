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

app.get('/routes/', (req, res) => {
  res.sendFile(path.join(__dirname,'routes.html'));
});

app.get('/routes/all', (req, res) => {
  res.json(router.stack);
});


router.get('/posts/', (req,res) => {
  axios.get(`${process.env.PUB_MANAGER_URL}/pubs/user/${req.params.userId}`)
    .then(response => {
      res.json(response);
    })
})

router.get('/posts/:userId/', (req, res) => {
  // To do when connect with proxy
  // axios.get(`${process.env.PUB_MANAGER_URL}pubs/user/${req.params.userId}`)
  //   .then(response => {
  //     res.json(response);
  //   })

  const posts = JSON.parse(require("./models/mockup/posts.json"));
  
  const mapped = posts.map(item => item.author.id === req.params.userId)

  res.json(mapped);
})

router.get('/twitter/:id/update', (req,res) => {
  axios.get(`${process.env.TWITTER_PROXY_URL}/posts/${req.params.id}`)
    .then(response => {
      forcedUpdate(req.params.id, response.data);
    })
})

router.get('/user/:userId', (req, res) => {
  axios.get(`${process.env.USER_MANAGER_URL}/users/${req.params.userId}`)
    .then(response => {
      if (response.statusCode == 200) {
        res.json(response);
      }
    })
    .catch(err => {
      res.statusCode = 500;
      res.json(err);
    })
})

app.use('/', router);

app.listen(app.get("port"), () => {
  console.log("Express server listening on port " + app.get("port"));
});