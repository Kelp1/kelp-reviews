const mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost/welpReviews';

const db = mongoose.connect(mongoUrl);

module.exports = db;