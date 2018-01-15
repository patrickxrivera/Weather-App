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

async function getCurrent(position) {
  setWeather(position);
  setForecast(position);
};

async function setWeather(position) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
  let weatherData = await getData(position, weatherUrl);
  renderWeatherHTML(weatherData);
  console.log(weatherData);
}

async function setForecast(position) {
  let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
  let forecastData = await getData(position, forecastUrl);
}

async function getData(position, url) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentLocationUrl = `${url}&lat=${lat}&lon=${lon}`;
  let data = await getJSON(currentLocationUrl);
  return data;
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
  let cityEl = document.querySelector('.location-area .current-city');
  let countryEl = document.querySelector('.location-area .current-country');
  let temp = Math.round(data.main.temp);
  let wind = Math.round(data.wind.speed);
  let city = data.name;
  let country = data.sys.country;
  console.log(country);
  windEl.textContent = `${wind}mph`;
  tempEl.textContent = temp;
  cityEl.textContent = `${city}, `;
  countryEl.textContent = country;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};


(function() { // TODO
  navigator.geolocation.getCurrentPosition(getCurrent, error);
}());

(function() { // TODO
  let now = new Date();
  let date = getDate(now);
  let day = getDay(now);
  let time = getTime(now)
  renderDate(date);
  renderDay(day);
  renderTime(time);
}())

function getDate(now) {
  let date = now.getDate();
  return addSuffixTo(date);
}

function getDay(now) {
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  let dayNum = now.getDay();
  let dayName = days[dayNum];
  return dayName;
}

function getTime(now) {
  let time =
    now
      .toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
      .toLowerCase();
  return time;
}

function addSuffixTo(date) {
  let suffix = getSuffixOf(date);
  return date + suffix;
}

function getSuffixOf(date) {
  let suffix;
  let remainder = date % 10;

  if (remainder === 1 && date !== 11) {
    suffix = 'st';
  }
  else if (remainder === 2 && date !== 12) {
    suffix = 'nd';
  }
  else if (remainder === 3 && date !== 13) {
    suffix = 'rd';
  }
  else {
    suffix = 'th';
  }

  return suffix;
}

function renderDate(date) {
  let dateEl = document.querySelector('.weather-today-area .weather-today-date')
  dateEl.textContent = date;
}

function renderDay(day) {
  let dayEl = document.querySelector('.weather-today-area .weather-today-weekday')
  dayEl.textContent = day;
}

function renderTime(time) {
  let timeEl = document.querySelector('.location-and-time-area .time-text');
  timeEl.textContent = time;
}
