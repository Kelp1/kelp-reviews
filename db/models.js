const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  reviews: [{
    user_id: {
      picture: String,
      name: String,
      friends: Number,
      review_count: Number,
    },
    stars: Number,
    date: Date,
    text: String,
    cool_votes: Number,
    funny_votes: String,
    useful_votes: String,
  }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports.Restaurant = Restaurant;