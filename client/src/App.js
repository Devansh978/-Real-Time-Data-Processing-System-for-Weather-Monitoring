import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './App.css';

function App() {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [weatherHistory, setWeatherHistory] = useState([]); // To store historical weather data
  const [threshold, setThreshold] = useState({ temp: 35, humidity: 80, windSpeed: 36 }); // Default thresholds in km/h

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, [city, units]);

  // Fetch current weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=fd79185904a87785410a2a7c98a6163c`
      );
      setWeatherData(response.data);

      // Add current weather to history if not already present
      setWeatherHistory((prevHistory) => {
        const exists = prevHistory.some(entry => entry.dt === response.data.dt);
        return exists ? prevHistory : [...prevHistory, response.data];
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Fetch forecast data
  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=fd79185904a87785410a2a7c98a6163c`
      );
      // Get daily forecast by filtering every 8th hour for a 5-day forecast
      const dailyForecast = response.data.list.filter((_, index) => index % 8 === 0);
      setForecastData(dailyForecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  // Update city on user input
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Toggle between Celsius and Fahrenheit
  const toggleUnits = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
  };

  // Calculate Daily Summary
  const calculateDailySummary = () => {
    const temperatures = weatherHistory.map((entry) => entry.main.temp);
    const humidities = weatherHistory.map((entry) => entry.main.humidity);
    const windSpeeds = weatherHistory.map((entry) => entry.wind.speed * 3.6); // Convert to km/h
    const pressures = weatherHistory.map((entry) => entry.main.pressure);
    const visibilities = weatherHistory.map((entry) => entry.visibility);
    
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    const avgTemp = temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length;

    const avgHumidity = humidities.reduce((acc, hum) => acc + hum, 0) / humidities.length;
    const avgWindSpeed = windSpeeds.reduce((acc, wind) => acc + wind, 0) / windSpeeds.length;
    const avgPressure = pressures.reduce((acc, press) => acc + press, 0) / pressures.length;
    const avgVisibility = visibilities.reduce((acc, visibility) => acc + visibility, 0) / visibilities.length;

    const dominantCondition = weatherHistory
      .map((entry) => entry.weather[0].main)
      .reduce((prev, curr, i, arr) =>
        arr.filter((v) => v === prev).length >= arr.filter((v) => v === curr).length ? prev : curr
      );

    return {
      maxTemp,
      minTemp,
      avgTemp,
      avgHumidity,
      avgWindSpeed,
      avgPressure,
      avgVisibility,
      dominantCondition,
    };
  };

  // Trigger threshold alert
  const checkThreshold = () => {
    if (weatherData) {
      const { temp } = weatherData.main;
      const { humidity } = weatherData.main;
      const windSpeed = weatherData.wind.speed * 3.6; // Convert to km/h

      if (temp > threshold.temp) {
        alert(`Temperature exceeded ${threshold.temp}°C`);
      }

      if (humidity > threshold.humidity) {
        alert(`Humidity exceeded ${threshold.humidity}%`);
      }

      if (windSpeed > threshold.windSpeed) {
        alert(`Wind speed exceeded ${threshold.windSpeed} km/h`);
      }
    }
  };

  useEffect(() => {
    checkThreshold(); // Check the threshold whenever new weather data is fetched
  }, [weatherData]);

  // Handle threshold changes by the user
  const handleThresholdChange = (e) => {
    const { name, value } = e.target;
    setThreshold((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="weather-dashboard">
      <header>
        <h1> Real-Time Data Processing 
          System for
        Weather Monitoring </h1>
        <div className="search-bar">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
          />
          <button onClick={fetchWeatherData}>
            <FaSearch />
          </button>
          <button onClick={toggleUnits}>
            {units === 'metric' ? '°C' : '°F'}
          </button>
        </div>
      </header>

      {weatherData && (
        <div className="current-weather">
          <h2>{weatherData.name}</h2>
          <div className="weather-info">
            <h3>{Math.round(weatherData.main.temp)}°{units === 'metric' ? 'C' : 'F'}</h3>
            <p>{weatherData.weather[0].description}</p>
            <div className="details">
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind: {(weatherData.wind.speed * 3.6).toFixed(2)} km/h</p> {/* Updated wind speed */}
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Visibility: {(weatherData.visibility / 1000).toFixed(1)} km</p>
              <p>Cloudiness: {weatherData.clouds.all}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Daily Summary */}
      {weatherHistory.length > 0 && (
        <div className="daily-summary">
          <h3>Daily Weather Summary</h3>
          {weatherHistory.length >= 5 && (
            <div>
              <p>Average Temp: {Math.round(calculateDailySummary().avgTemp)}°C</p>
              <p>Max Temp: {Math.round(calculateDailySummary().maxTemp)}°C</p>
              <p>Min Temp: {Math.round(calculateDailySummary().minTemp)}°C</p>
              <p>Average Humidity: {Math.round(calculateDailySummary().avgHumidity)}%</p>
              <p>Average Wind Speed: {Math.round(calculateDailySummary().avgWindSpeed)} km/h</p> {/* Updated wind speed */}
              <p>Average Pressure: {Math.round(calculateDailySummary().avgPressure)} hPa</p>
              <p>Average Visibility: {(calculateDailySummary().avgVisibility / 1000).toFixed(1)} km</p>
              <p>Dominant Condition: {calculateDailySummary().dominantCondition}</p>
            </div>
          )}
        </div>
      )}

      {/* Weather History */}
      {weatherHistory.length > 0 && (
        <div className="weather-history">
          <h3>Weather History</h3>
          <ul>
            {weatherHistory.map((entry, index) => (
              <li key={index}>
                <p>Date: {new Date(entry.dt * 1000).toLocaleDateString()}</p>
                <p>Temperature: {Math.round(entry.main.temp)}°{units === 'metric' ? 'C' : 'F'}</p>
                <p>Humidity: {entry.main.humidity}%</p>
                <p>Wind Speed: {(entry.wind.speed * 3.6).toFixed(2)} km/h</p> {/* Updated wind speed */}
                <p>Pressure: {entry.main.pressure} hPa</p>
                <p>Visibility: {(entry.visibility / 1000).toFixed(1)} km</p>
                <p>Condition: {entry.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Forecast */}
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-cards">
          {forecastData.map((day, index) => (
            <div key={index} className="forecast-card">
              <p>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
              <p>{Math.round(day.main.temp_max)}° / {Math.round(day.main.temp_min)}°</p>
              <p>Humidity: {day.main.humidity}%</p>
              <p>Wind Speed: {(day.wind.speed * 3.6).toFixed(2)} km/h</p> {/* Updated wind speed */}
              <p>Pressure: {day.main.pressure} hPa</p>
              <p>Cloudiness: {day.clouds.all}%</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User-defined Thresholds */}
      <div className="thresholds">
        <h3>Set Weather Thresholds</h3>
        <div className="threshold-inputs">
          <label>
            Temperature Threshold (°C):
            <input
              type="number"
              name="temp"
              value={threshold.temp}
              onChange={handleThresholdChange}
            />
          </label>
          <label>
            Humidity Threshold (%):
            <input
              type="number"
              name="humidity"
              value={threshold.humidity}
              onChange={handleThresholdChange}
            />
          </label>
          <label>
            Wind Speed Threshold (km/h):
            <input
              type="number"
              name="windSpeed"
              value={threshold.windSpeed}
              onChange={handleThresholdChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
