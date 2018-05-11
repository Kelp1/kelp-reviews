const newRelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../db/connectionSDC.js');
const path = require('path');
const redisClient = require('redis').createClient;
const responseTime = require('response-time');
const morgan = require('morgan');
const cluster = require('cluster');
const expstate = require('express-state');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
require("babel-register")({
    presets: ["react"]
});
const Reviews = require('../babel_views/index.jsx').default;
const handlebars = require('express-handlebars');


if (cluster.isMaster) {

  //Count the machine's CPUs
  const cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

} else {
  // const redis = redisClient('redis://cache:6379');
  const redis = redisClient(6379, 'localhost');
  
  const app = express();
  expstate.extend(app);
  app.set("state namespace", "Reviews");
  if (app.get('env') !== 'production') {
    console.log('node believes we are not in production mode');
    app.use(morgan('dev'));
    app.use(responseTime());
  }

  app.engine('handlebars', handlebars({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');
  
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '/../public')));
  // app.get('/', cors(), (req, res) => {
  //   const initialState = {
  //     isLoaded: false,
  //   };
  //   const appString = ReactDOMServer.renderToString(React.createElement(Reviews));
    
  //   res.expose(initialState, "main.initialState");

  //   res.render("Reviews.handlebars", {
  //     title: "Server Rendered React",
  //     appString: appString,
  //     initalState: initialState },
  //     function(err, html) {
  //       console.log(err);
  //       console.log(html);
  //       res.send(html);
  //     }
  //   );
  // });
  
  app.use(express.static(path.join(__dirname, '/../public')));

  app.get('/api/review/votes/:reviewid/:button/:direction/:userID', cors(), (req, res) => {
    db.update(req.params.reviewid, req.params.button, req.params.direction, req.params.userID, (err, review) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(review);
      }
    });
  });
  
  function retrieve(id, sort, page, keyword = '', req, res) {
    db.retrieve(redis, id, sort, page, keyword, (err, reviews) => {
    //db.retrieve(id, sort, page, keyword, (err, reviews) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(reviews);
      }
    });
  }
  
  app.get('/api/review/:id/:sort/:page/:keyword', cors(), (req, res) => {
    retrieve(req.params.id, req.params.sort, req.params.page, req.params.keyword, req, res);
  });
  
  app.get('/api/review/:id/:sort/:page', cors(), (req, res) => {
    retrieve(req.params.id, req.params.sort, req.params.page, '', req, res);
  });
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => console.log(`listening on port ${port}`));
}
