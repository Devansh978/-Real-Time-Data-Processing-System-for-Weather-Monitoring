const express = require('express');
const { fetchWeatherData, fetchWeatherForecast } = require('../services/weatherService');
const WeatherData = require('../models/WeatherData');
const router = express.Router();

// Fetch and store current weather data for a city
router.get('/:city', async (req, res) => {
  const city = req.params.city;
  const weatherData = await fetchWeatherData(city);
  
  if (weatherData) {
    const weatherRecord = new WeatherData(weatherData);
    await weatherRecord.save();
    res.json(weatherData);
  } else {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get historical weather data for a city
router.get('/history/:city', async (req, res) => {
  const city = req.params.city;
  const data = await WeatherData.find({ city: city }).sort({ dt: -1 }).limit(10);
  res.json(data);
});

// Fetch weather forecast data for a city
router.get('/forecast/:city', async (req, res) => {
  const city = req.params.city;
  const forecastData = await fetchWeatherForecast(city);
  
  if (forecastData) {
    res.json(forecastData);
  } else {
    res.status(500).json({ error: 'Failed to fetch weather forecast' });
  }
});

module.exports = router;
