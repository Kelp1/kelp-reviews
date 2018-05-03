-- DROP DATABASE IF EXISTS kelpReviews;
-- CREATE DATABASE kelpReviews;
-- \c kelpReviews;

-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS restaurants;
-- DROP TABLE IF EXISTS reviews;

-- CREATE TABLE users (
--   id INT,
--   name VARCHAR,
--   picture VARCHAR,
--   friends INT,
--   review_count INT,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE restaurants (
--   id INT,
--   name VARCHAR,
--   PRIMARY KEY (id)
-- );

CREATE TABLE reviews (
  id INT,
  restaurant_id INT,
  user_id INT,
  stars INT,
  date VARCHAR,
  text VARCHAR,
  cool_votes INT,
  funny_votes VARCHAR,
  useful_votes VARCHAR,
  PRIMARY KEY (id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);
