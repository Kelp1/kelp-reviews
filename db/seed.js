const faker = require('faker');
const db = require('./connection.js');
const Restaurant = require('./models.js').Restaurant;
const fs = require('fs');
const mongoose = require('mongoose');

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

function seeder() {
  for (let i = 0; i < 1; i++) {
    const restaurants = [];
    for (let k = 0; k < 10000; k++) {
      const restaurant = createRestaurant(i, k);
      restaurants.push(JSON.stringify(restaurant));
    }
    fs.appendFileSync('./trialDataForDeploymentSmall.json', restaurants.join('\n') + '\n');
    console.log(`batch ${i} inserted`);
  }
}

seeder();