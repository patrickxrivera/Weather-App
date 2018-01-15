// use resources from here to get openweather to work in CodePen
// use navigator.geolocation method for geolocation

/*
  1) Get weather data from current location
    // get current location
    // make API call for current weather data
    // Today - a) current weather, day of the week, day of the month, wind, weather type, city, state, time
    // Forecast day of the week, weather type, average weather
  2) Update styling based on weather type
    // large current Weather
    // small current weather
    // 5-day forecast
    // top-bg color, top font color
  3) Animations
  4) toggle celsius and fahrenheit
*/

function success(position) {
  let coords = position.coords;
  let lat = coords.latitude;
  let lon = coords.longitude;
  setWeather(lat, lon);
  setForecast(lat, lon);
  getData(lat, lon);
};

function getData(lat, lon) {
}

async function setWeather(lat, lon) {
  let weatherData = await getWeatherData(lat, lon);
  renderWeatherHTML(weatherData)
}

async function getWeatherData(lat, lon) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  weatherUrl = `${weatherUrl}&lat=${lat}&lon=${lon}`;
  let weatherData = await getJSON(weatherUrl);
  return weatherData;
}

async function getJSON(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }
  catch(err) {
    console.warn('Error', e);
  }
}

function renderWeatherHTML(data) {
  let tempEl = document.querySelector('.weather-today-degrees');
  let windEl = document.querySelector('.weather-today-subtext');
  let temp = Math.round(data.main.temp);
  let wind = Math.round(data.wind.speed);
  windEl.textContent = `${wind}mph`;
  tempEl.textContent = temp;
}

async function setForecast(lat, lon) {
  let forecastData = await getForecastData(lat, lon);
}

async function getForecastData(lat, lon) {
  let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  forecastUrl = `${forecastUrl}&lat=${lat}&lon=${lon}`;
  let forecastData = await getJSON(forecastUrl);
  return forecastData;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

(function() {
  navigator.geolocation.getCurrentPosition(success, error);
}());
