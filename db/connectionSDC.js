const mongoose = require('mongoose');
const Restaurant = require('./models.js').Restaurant;

const retrieve = (redis, id, sort, page, keyword, callback) => {

  const conf = { 
    hostname: process.env.MONGO_HOSTNAME || 'localhost', 
    port: process.env.MONGO_PORT || 27017, 
    env: process.env.MONGO_ENV || 'local', 
  };
  
  let dbUser;
  if (process.env.MONGO_USER && process.env.MONGO_PASS) { 
    dbUser = {user: process.env.MONGO_USER, pass: process.env.MONGO_PASS} 
  } else {
    dbUser = undefined; // on local dev not required 
  }

  mongoose.connect('mongodb://localhost/welpReviews');

  const { connection } = mongoose;

  
  redis.get(id, sort, page, keyword, (err, reply) => {
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once('open', () => {
      console.log(id);
      Restaurant.find({ 'id': id }, null, null, (err2, data) => {
        if (err2) {
          callback(err2, null);
        } else {
          var data = JSON.stringify(data);
          data = JSON.parse(data);

          if (keyword) {
            data[0].reviews = data[0].reviews.filter(review => review.text.includes(keyword));
          }

          for (let i = 0; i < data[0].reviews.length; i++) {
            const text = [data[0].reviews[i].text];
            data[0].reviews[i].text = text;

            let { stars } = data[0].reviews[i];
            stars = `https://s3.amazonaws.com/hrsf93welpusers/${stars}.png`
            data[0].reviews[i].numStars = data[0].reviews[i].stars;
            data[0].reviews[i].stars = stars;

            data[0].reviews[i].business_id = {};
            data[0].reviews[i].business_id.name = data[0].name;
            data[0].reviews[i].business_id._id = data[0].id;

            data[0].reviews[i].user_id = data[0].reviews[i].user;
            let friendsList = [];
            for (var f = 0; f < data[0].reviews[i].user.friends; f++) {
              friendsList.push(0);
            }
            data[0].reviews[i].user_id.friends = friendsList;

            data[0].reviews[i].cool = data[0].reviews[i].cool_votes.length;
            data[0].reviews[i].useful = data[0].reviews[i].useful_votes.length;
            data[0].reviews[i].funny = data[0].reviews[i].funny_votes.length;
          }
          
          if (sort === '1') {
            data[0].reviews.sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            });
          } else if (sort === '2') {
            data[0].reviews.sort((a, b) => {
              return new Date(a.date) - new Date(b.date);
            });
          } else if (sort === '3') {
            data[0].reviews.sort((a, b) => {
              return b.numStars - a.numStars;
            });
          } else if (sort === '4') {
            data[0].reviews.sort((a, b) => {
              return a.numStars - b.numStars;
            });
          } else if (sort === '5') {
            data[0].reviews.sort((a, b) => {
              return b.user.friends.length - a.user.friends.length;
            });
          }


          callback(null, data[0].reviews);
        }
      });
    });
  });
};

const update = (reviewId, voteId, direction, userID, callback) => {

}



module.exports.retrieve = retrieve;
module.exports.update = update;