const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  reviews: [{
    user: {
      user_id: Number,
      picture: String,
      name: String,
      friends: Number,
      review_count: Number,
    },
    stars: Number,
    date: Date,
    text: String,
    cool_votes: [{
      user_id: Number,
    }],
    funny_votes: [{
      user_id: Number,
    }],
    useful_votes: [{
      user_id: Number,
    }],
  }],
});


module.exports.restaurantSchema = restaurantSchema;