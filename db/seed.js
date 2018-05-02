const faker = require('faker');
const db = require('./connection.js');
const Restaurant = require('./models.js').Restaurant;
const fs = require('fs');

const votes = [-2, -1, 0, 1, 2, 3, 4];

function createReviewArray() {
  const result = [];
  const amount = Math.floor(Math.random() * 22);
  for (var i = 0; i < amount; i++) {
    result.push(createReview());
  }
  return result;
}

function createReview() {
  return {
    user_id: {
      name: faker.name.firstName(),
      picture: faker.internet.avatar(),
      friends: Math.floor(Math.random() * 500),
      review_count: Math.floor(Math.random() * 350),
    },
    stars: (1 + Math.floor(Math.random() * 5)),
    date: faker.date.past(),
    text: faker.lorem.sentence(),
    cool_votes: Math.floor(Math.random() * votes.length),
    funny_votes: Math.floor(Math.random() * votes.length),
    cool_votes: Math.floor(Math.random() * votes.length),
  };
}

function createRestaurant(i, k) {
  return {
    name: faker.company.companyName(),
    id: ((i * 10000) + k),
    reviews: createReviewArray(),
  }
}

function seeder() {
  for (let i = 0; i < 250; i++) {
    const restaurants = [];
    for (let k = 0; k < 10000; k++) {
      const restaurant = createRestaurant(i, k);
      restaurants.push(JSON.stringify(restaurant));
    }
    fs.appendFileSync('./trialDataSplit.json', restaurants.join('\n') + '\n');
    console.log(`batch ${i} inserted`);
  }
}

seeder();


