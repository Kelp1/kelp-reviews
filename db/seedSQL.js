const faker = require('faker');
const db = require('./pgconnection.js');
const fs = require('fs');
const moment = require('moment');

// const sql = fs.readFileSync(__dirname + '/schema.sql', 'utf8').toString();

// db.query(sql)
//   .then(() => {
//     console.log(`schema'd`);
//   })
//   .catch((err) => {
//     console.log('err:', err);
//   });

const insertUser = (inputArr) => {
  db.none('INSERT INTO users(id, name, picture, friends, review_count) VALUES($1, $2, $3, $4, $5)', inputArr)
    .then(() => {
      console.log('insertedUser');
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

const getNum = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

const insertRestaurant = (inputArr) => {
  db.none('INSERT INTO restaurants(id, name) VALUES($1, $2)', inputArr)
    .then(() => {
      console.log('inserted restaurant');
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

const insertReview = (inputArr) => {
  db.none('INSERT INTO reviews(id, restaurant_id, user_id, stars, date, text, cool_votes, funny_votes, useful_votes) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', inputArr)
    .then(() => {
      console.log('inserted review');
    })
    .catch((err) => {
      console.log('err:', err);
    });
};

// for (let j = 0; j < 1000; j++) {
//   let restaurants = [];
//   for (let jj = 0; jj < 10000; jj++) {
//     const restaurant = `${((j * 10000) + jj)}|${faker.company.companyName()}`;
//     // insertRestaurant(restaurant);
//     restaurants.push(restaurant);
//   }
//   fs.appendFileSync('./trialRestaurantsPostgresData', restaurants.join('\n') + '\n');
//   console.log(`batch ${j} inserted`);
// }

// for (let k = 0; k < 1000; k++) {
//   let users = [];
//   for (let kk = 0; kk < 10000; kk++) {
//     const user = `${((k * 10000) + kk)}|${faker.name.findName()}|${faker.image.avatar()}|${getNum(0, 200)}|${getNum(0, 350)}`
//     users.push(user);
//   }
//   // insertUser(user);
//   fs.appendFileSync('./trialUsersPostgresData', users.join('\n') + '\n');
//   console.log(`batch ${k} inserted`);
// }

for (let i = 0; i < 1000; i++) {
  let reviews = [];
  for (let ii = 0; ii < 100000; ii++) {
    const review = `${((i * 100000) + ii)}|${getNum(0, 9999999)}|${getNum(0, 9999999)}|${getNum(1, 5)}|${moment(faker.date.past()).format('MM/DD/YYYY h:mm:ss a')}|${faker.lorem.sentence()}|${getNum(0, 2)}|${getNum(0, 2)}|${getNum(0, 2)}`
    reviews.push(review);
  }
  fs.appendFileSync('./trialReviewsPostgresData', reviews.join('\n') + '\n');
  console.log(`batch ${i} inserted`);
}