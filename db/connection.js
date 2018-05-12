const mongoose = require('mongoose');

const mongoUrl = 'mongodb://kelp:kelp@ds119660.mlab.com:19660/kelp-reviews';

const db = mongoose.connect(mongoUrl);

module.exports = db;