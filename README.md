# Welcome to Real-Time Weather Monitoring System 👋
![Version](https://img.shields.io/badge/version-In v1.0, the system could deliver basic real--time data, showing current temperature, humidity, and conditions for a specified location. v1.1 might introduce data visualizations, displaying hourly and daily trends in simple charts. Moving to v1.2, user--configurable alerts for extreme weather could be added. v1.3 would then implement rollup functions for weekly and monthly aggregates, while v2.0 would offer enhanced forecasting, an improved UI, and additional parameters for detailed weather analysis.-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> The Real-Time Weather Monitoring System with Rollups and Aggregates is a MERN-stack application that processes live weather data from the OpenWeatherMap API. This system collects and monitors weather parameters such as temperature, humidity, and wind speed, then aggregates this data to provide insights through summaries and trend analysis. It features user-configurable alert thresholds for critical weather events and includes test cases for reliability. Additionally, visualizations are provided to make weather patterns easy to understand, with options for extending parameters and forecast capabilities in future development.

### 🏠 [Homepage](This project is a Real-Time Weather Monitoring System that allows users to search for current weather data, view a 5-day forecast, and analyze historical weather data for a specific city. Users can also set customizable thresholds for temperature, humidity, and wind speed, receiving alerts when these thresholds are exceeded. The application is built using React and consumes data from the OpenWeatherMap API.

Features:-
Current Weather Data: Displays real-time weather information, including temperature, humidity, wind speed, pressure, visibility, and cloudiness.

5-Day Weather Forecast: Provides a daily forecast for the next five days, showing maximum and minimum temperatures, humidity, wind speed, and weather conditions.

Weather History: Records historical weather data for the searched city, allowing users to review past weather conditions.

Customizable Thresholds: Users can set thresholds for temperature, humidity, and wind speed. Alerts will notify users if current conditions exceed these limits.

Unit Toggle: Easily switch between metric (Celsius) and imperial (Fahrenheit) units for temperature measurements.

Technologies Used
Frontend: React
Backend: OpenWeatherMap API
Styling: CSS
Icons: React Icons

Installation
To run the application locally, follow these steps:

1. Install the necessary packages:

bash
npm install

2. Replace the placeholder API key in App.js with your OpenWeatherMap API key:

javascript
const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=fd79185904a87785410a2a7c98a6163c`
);
4. Start the development server:

bash
npm start
Open a browser and navigate to http://localhost:3000 to view the application.)

## Install

```sh
Installation Steps

1. Create a New React App: Run the following command in a terminal to create a new React application:

bash
npx create-react-app client

2. Navigate into Project Directory: Change a directory to the newly created app:

bash
cd client

3. Install Axios: Use the following command to install Axios for handling API requests:

bash
npm install axios

4. Install React Icons: For using icons in  app, install react-icons:

bash
npm install react-icons

5. Run the Application: Start the development server to see  app in action:

bash
npm start

You can now open a browser and go to http://localhost:3000 to view  real-time weather monitoring system.

(Frontend dependencies)
npm install @emotion/react@^11.13.3 @emotion/styled@^11.13.0 @mui/icons-material@^6.1.5 @mui/material@^6.1.5 @testing-library/jest-dom@^5.17.0 @testing-library/react@^13.4.0 @testing-library/user-event@^13.5.0 axios@^1.7.7 react@^18.3.1 react-dom@^18.3.1 react-icons@^5.3.0 react-scripts@^5.0.1 web-vitals@^2.1.4


 Initialize the Backend 
1. Navigate to the Backend Directory: If your backend code is in a separate directory, move into that directory:

bash
cd server

2. Initialize a Node.js Project: If you haven’t already, initialize a new Node.js project. This will create a package.json file:

bash
npm init -y

 Install Required Dependencies
Here are some essential packages you may need:

Express: For setting up the server and handling HTTP requests.
Axios (optional): If you're using Axios in the backend as well.
Dotenv: For managing environment variables, such as API keys.

Run this command to install the dependencies:

bash
npm install express axios dotenv

Set Up a Environment Variables

1.Created a .env file in the root of backend directory to store  OpenWeatherMap API key.

2.In the .env file, added API key:

bash
WEATHER_API_KEY=fd79185904a87785410a2a7c98a6163c

3.Load these environment variables in your backend code by requiring dotenv at the top of your main server file:

javascript
Copy code
require('dotenv').config();

4.Created Server Code (e.g., server.js)

5. Start the Backend Server
Use the following command to start the backend server:

bash
node server.js
Alternatively, if you prefer to use nodemon to automatically restart the server on code changes, install it globally and run:

bash
npm install -g nodemon
nodemon server.js

 backend server should now be running on http://localhost:5000, with endpoints ready for handling weather data requests.

```

## Usage

```sh
Usage Instructions
Frontend (React App)

1. Navigate to the React Application Directory: In a terminal, make sure you are in the directory of your React application. If you're not already there, navigate to it:

bash
cd client

2. Start the React Application: To run the React app, execute the following command:

bash
npm start

This will start the development server, and you can view the app in your browser at http://localhost:3000.

Using the Weather Monitoring System:

1. Search for a City: Type the name of the city you want to check the weather for in the input box and click the search button (magnifying glass icon).

2. Toggle Units: Use the button to switch between Celsius and Fahrenheit to view temperatures in your preferred unit.

3. View Current Weather: The current weather for the specified city will be displayed, including temperature, humidity, wind speed, pressure, and visibility.

4. Daily Summary: After fetching weather data multiple times, a daily summary will show average, maximum, and minimum temperatures, as well as average humidity and wind speed.

5. View Weather History: The weather history for previous fetches will be listed.

6. View 5-Day Forecast: The app will display a 5-day weather forecast.
Set Thresholds: You can set thresholds for temperature, humidity, and wind speed to receive alerts if they are exceeded.

Backend (Node.js Server)

1. Navigate to the Backend Directory: Open a new terminal window or tab, and navigate to a backend directory:

bash
cd server

2. Start the Node.js Server: To run the backend server, execute:

bash
node server.js

The server will start, and you should see a message indicating that it is running on http://localhost:5000.

3. API Endpoints:

Fetch Current Weather:
GET http://localhost:5000/api/weather?city={CITY_NAME}&units={UNITS}

Replace {CITY_NAME} with the desired city name and {UNITS} with either metric (for Celsius) or imperial (for Fahrenheit).

Fetch Weather Forecast:
GET http://localhost:5000/api/forecast?city={CITY_NAME}&units={UNITS}

Similar to the weather endpoint, replace the parameters accordingly.
```

## Run tests

```sh
Testing the Frontend (React App)

1. Navigate to the React Application Directory: Make sure you're in the directory of your React app:

bash
cd client

2. Run Tests: If you have written tests using a testing framework like Jest (which comes with Create React App by default), you can run:

bash
npm test

Testing the Backend (Node.js Server)

1. Navigate to the Backend Directory: Open a new terminal window and navigate to your backend directory:

bash
cd server

2.Run Tests: If you have implemented tests for your backend API (e.g., using Mocha, Chai, or Jest), you can run the tests using:

bash
npm test

3. Manual API Testing: You can also test the API endpoints manually using tools like Postman or Curl. Here’s how you can test the endpoints using Curl:

Fetch Weather Forecast:

bash
GET "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=fd79185904a87785410a2a7c98a6163c"
```

## Author

👤 **Devansh Chourey**

* Github: [@Devansh978](https://github.com/Devansh978)

## Thank you
