const mongoose = require('mongoose');
const restaurantSchema = require('./models.js').restaurantSchema;
const connA = mongoose.createConnection('mongodb://34.210.73.77/kelpReviews');
const connB = mongoose.createConnection('mongodb://34.214.77.149/kelpReviews');
const connC = mongoose.createConnection('mongodb://52.38.123.246/kelpReviews');
const Restaurant1 = connA.model('Restaurant', restaurantSchema);
const Restaurant2 = connB.model('Restaurant', restaurantSchema);
const Restaurant3 = connC.model('Restaurant', restaurantSchema);


const searchMongo = function(model, redis, id, sort, page, keyword = '', callback) {
  model.find({ 'id': id }, null, null, (err2, data) => {
    if (err2) {
      callback(err2, null);
    } else {
      const restaurantReviews = []
      if (data[0]) {
        var relavantReviews = data[0].reviews.filter(review => review.text.includes(keyword));
      } else {
        var relavantReviews = [];
      }

      for (let i = 0; i < relavantReviews.length; i++) {
        const friendsList = [];
        for (var f = 0; f < relavantReviews[i].user.friends; f++) {
          friendsList.push(0);
        }
        restaurantReviews.push({
          text: [relavantReviews[i].text],
          stars: `https://s3.amazonaws.com/hrsf93welpusers/${relavantReviews[i].stars}.png`,
          date: relavantReviews[i].date,
          numStars: relavantReviews[i].stars,
          business_id: {
            name: data[0].name,
            _id: data[0].id,
          },
          user_id: {
            name: relavantReviews[i].user.name,
            picture: relavantReviews[i].user.picture,
            review_count: relavantReviews[i].user.review_count,
            friends: friendsList,
          },
          cool: relavantReviews[i].cool_votes.length,
          useful: relavantReviews[i].useful_votes.length,
          funny: relavantReviews[i].funny_votes.length,
        });
      }
      
      if (sort === '1') {
        restaurantReviews.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      } else if (sort === '2') {
        restaurantReviews.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      } else if (sort === '3') {
        restaurantReviews.sort((a, b) => {
          return b.numStars - a.numStars;
        });
      } else if (sort === '4') {
        restaurantReviews.sort((a, b) => {
          return a.numStars - b.numStars;
        });
      } else if (sort === '5') {
        restaurantReviews.sort((a, b) => {
          return b.user.friends.length - a.user.friends.length;
        });
      }
      redis.set(`${id}${sort}${keyword}`, JSON.stringify(restaurantReviews), () => {
        callback(null, restaurantReviews);
      });
    }
  });
}


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

  redis.get(`${id}${sort}${keyword}`, (err, reply) => {
    if (err) {
      callback(null);
    } else if (reply) {
      callback(null, JSON.parse(reply));
    } else {
      if (id < 3340000) {
        searchMongo(Restaurant1, redis, id, sort, page, keyword, callback);
      } else if (id < 6670000) {
        searchMongo(Restaurant2, redis, id, sort, page, keyword, callback);
      } else {
        searchMongo(Restaurant3, redis, id, sort, page, keyword, callback);
      }
    }
  });
};

const update = (reviewId, voteId, direction, userID, callback) => {

}



module.exports.retrieve = retrieve;
module.exports.update = update;