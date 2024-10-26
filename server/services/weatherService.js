const axios = require('axios');
const API_KEY = 'fd79185904a87785410a2a7c98a6163c'; // Replace with your API key

// Function to fetch current weather data
const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return {
      city: response.data.name,
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      main: response.data.weather[0].main,
      humidity: response.data.main.humidity,
      wind_speed: response.data.wind.speed,
      dt: response.data.dt
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Function to fetch weather forecast data
const fetchWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data.list.map((forecast) => ({
      city: city,
      temp: forecast.main.temp,
      main: forecast.weather[0].main,
      humidity: forecast.main.humidity,
      wind_speed: forecast.wind.speed,
      dt: forecast.dt
    }));
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return null;
  }
};

module.exports = { fetchWeatherData, fetchWeatherForecast };
