const mongoose = require('mongoose');
const Restaurant = require('./models.js').Restaurant;
mongoose.connect('mongodb://kelp:kelp@ds119660.mlab.com:19660/kelp-reviews');

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

  const { connection } = mongoose;


  redis.get(`${id}${sort}${keyword}`, (err, reply) => {
    if (err) {
      callback(null);
    } else if (reply) {
      callback(null, JSON.parse(reply));
    } else {
      connection.on('error', console.error.bind(console, 'connection error:'));
      // connection.once('open', () => {
        Restaurant.find({ 'id': id }, null, null, (err2, data) => {
          if (err2) {
            callback(err2, null);
          } else {
            const restaurantReviews = []
  
            const relavantReviews = data[0].reviews.filter(review => review.text.includes(keyword));

            for (let i = 0; i < relavantReviews.length; i++) {
              const friendsList = [];
              for (var f = 0; f < relavantReviews[i].user.friends; f++) {
                friendsList.push(0);
              }
              console.log(relavantReviews[i].date);
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
              // const text = [relavantReviews[i].text];
              // data[0].reviews[i].text = text;

              // let { stars } = data[0].reviews[i].stars;
              // stars = `https://s3.amazonaws.com/hrsf93welpusers/${stars}.png`
              // data[0].reviews[i].numStars = data[0].reviews[i].stars;
              // data[0].reviews[i].stars = stars;
  
              // data[0].reviews[i].business_id = {};
              // data[0].reviews[i].business_id.name = data[0].name;
              // data[0].reviews[i].business_id._id = data[0].id;
  
              // data[0].reviews[i].user_id = data[0].reviews[i].user;
              // let friendsList = [];
              // for (var f = 0; f < data[0].reviews[i].user.friends; f++) {
              //   friendsList.push(0);
              // }
              // data[0].reviews[i].user_id.friends = friendsList;
  
              // data[0].reviews[i].cool = data[0].reviews[i].cool_votes.length;
              // data[0].reviews[i].useful = data[0].reviews[i].useful_votes.length;
              // data[0].reviews[i].funny = data[0].reviews[i].funny_votes.length;
            }
            
            if (sort === '1') {
              data[0].reviews.sort((a, b) => {
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
      // });
    }
  });
};

const update = (reviewId, voteId, direction, userID, callback) => {

}



module.exports.retrieve = retrieve;
module.exports.update = update;