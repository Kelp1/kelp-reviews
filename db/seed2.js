const faker = require('faker');
const Restaurant = require('./models.js').Restaurant;
const fs = require('fs');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://54.187.116.127/kelpReviews';
mongoose.connect(mongoUrl)
  // .then(() => console.log('inside then'))
  // .catch(() => console.log('inside catch'))
// MongoClient.connect(mongoUrl, function(err, client) {
//   if (err) {
//     console.log('err', err);
//   } else {
//     console.log('successfully connected to server');
//   }
// });

mongoose.connection.once('open', () => {
  console.log('Connection has been made, now make fireworks...');
  seeder();
}).on('error', (error) => {
  console.log('Connection error:', error);
});

function createReviewArray() {
  const result = [];
  const amount = Math.floor(Math.random() * 21);
  for (var i = 0; i < amount; i++) {
    result.push(createReview());
  }
  return result;
}

function createVoteArray() {
  const result = [];
  const weighting = Math.floor(Math.random() * 10);
  let amount;
  if (weighting < 8) {
    amount = Math.floor(Math.random() * 10);
  } else if (weighting === 8) {
    amount = Math.floor(Math.random() * 50);
  } else if (weighting > 8) {
    amount = Math.floor(Math.random() * 100);
  }
  for (var i = 0; i < amount; i++) {
    result.push(createVote());
  }
  return result;
}

function createVote() {
  return {
    user_id: Math.floor(Math.random() * 10000000),
  }
}

function createReview() {
  return {
    user: {
      name: faker.name.firstName(),
      picture: faker.internet.avatar(),
      friends: Math.floor(Math.random() * 500),
      review_count: Math.floor(Math.random() * 350),
    },
    stars: (1 + Math.floor(Math.random() * 5)),
    date: faker.date.past(),
    text: faker.lorem.sentence(),
    cool_votes: createVoteArray(),
    funny_votes: createVoteArray(),
    useful_votes: createVoteArray(),
  }
}

function createRestaurant(i, k) {
  return {
    name: faker.company.companyName(),
    id: ((i * 10000) + k),
    reviews: createReviewArray(),
  }
}

async function seeder() {
  for (let i = 334; i < 667; i++) {
    const restaurants = [];
    for (let k = 0; k < 10000; k++) {
      const restaurant = createRestaurant(i, k);
      restaurants.push(JSON.stringify(restaurant));
    }
    fs.appendFileSync('./dummyDataForAWS2.json', restaurants.join('\n') + '\n');
    console.log(`batch ${i} inserted`);
  }
}

// seeder();