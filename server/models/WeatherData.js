const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  temp: Number,
  feels_like: Number,
  main: String,
  dt: Number
});

module.exports = mongoose.model('WeatherData', weatherSchema);
