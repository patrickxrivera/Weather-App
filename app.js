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

(function() { // TODO
  navigator.geolocation.getCurrentPosition(getCurrent, error);
}());

async function getCurrent(position) {
  setWeather(position);
  setForecast(position);
};

async function setWeather(position) {
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
  let weatherData = await getData(position, weatherUrl);
  renderWeather(weatherData);
}

async function setForecast(position) {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
  let data = await getData(position, url);
  renderForecast(data)
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

function renderWeather(data) {
  let tempEl = document.querySelector('.weather-today-degrees');
  let windEl = document.querySelector('.weather-today-subtext');
  let cityEl = document.querySelector('.location-area .current-city');
  let countryEl = document.querySelector('.location-area .current-country');
  let temp = Math.round(data.main.temp);
  let wind = Math.round(data.wind.speed);
  let city = data.name;
  let country = data.sys.country;
  windEl.textContent = `${wind}mph`;
  tempEl.textContent = temp + degreesSymbol();
  cityEl.textContent = `${city}, `;
  countryEl.textContent = country;
  setWeatherIcons(data);
}

function renderForecast(data) {
  renderDays(data);
}

function renderDays(data) {
  let fiveDayForecastData = getNextFiveDays(data);
  let dayNames = getDayNamesFrom(fiveDayForecastData);
  let avgTemps = getAvgTempsFrom(fiveDayForecastData);
  renderForecasted(dayNames, 'days');
  renderForecasted(avgTemps, 'temps');
  renderIconsFrom(fiveDayForecastData);
}

function getNextFiveDays(data) {
  let forecastData =
    data
    .list
    .filter(forecast => {
      return isTargetTime(forecast);
    })
  console.log(forecastData);
  if (forecastData.length === 6) {
    forecastData.shift();
  }

  return forecastData;
}

function isTargetTime(forecast) {
  let date = new Date(forecast.dt * 1000);
  let forecastHour = date.getHours();
  let currentHour = getCurrentHour();
  // TODO => think of a better way to get proper forecast dates and times
  return forecastHour === currentHour ||
         forecastHour === currentHour + 1 ||
         forecastHour === currentHour + 2;
}

function getCurrentHour() {
  let now = new Date();
  return now.getHours();
}

function getDayNamesFrom(forecasts) {
  let days = [];
  forecasts.forEach(forecast => {
    let date = new Date(forecast.dt * 1000);
    let day = getDay(date)
    if (!days.includes(day)) {
      days.push(day);
    };
  })
  let formattedDays = format(days);
  return formattedDays;
}

function format(days) {
  let formattedDays =
    days
    .map(day => {
      return day.slice(0, 3).toUpperCase();
    })
  return formattedDays;
}

function renderForecasted(data, type) {
  let targetClass = getTargetClassFromData(type);
  let targetEls = document.querySelectorAll(targetClass);
  targetEls.forEach((el, index) => {
    let output = type === 'temps' ? data[index] + degreesSymbol() : data[index]; // TODO
    el.textContent = output;
  });
}

function getTargetClassFromData(type) {
  return type === 'days' ? '.forecast-weekday' : '.forecast-degrees';
}

function getAvgTempsFrom(forecasts) {
  let avgTemps = forecasts
    .map(forecast => {
      let avgTemp = Math.round(forecast.main.temp);
      return avgTemp;
    })
  return avgTemps;
}

function degreesSymbol() {
  return String.fromCharCode(176);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

(function() { // TODO
  let now = new Date();
  setDate(now);
  setDay(now);
  setTime(now);
}())

function setDate(now) {
  let date = getDate(now);
  renderDate(date);
}

function setDay(now) {
  let day = getDay(now);
  renderDay(day);
}

function setTime(now) {
  let time = getTime(now);
  renderTime(time);
}

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

/* set styling */
  // icons
  // top bg color
  // top font color

// get main temp description
// get time (day or night)
// map main temp and time to icon name, class name, fonts, etc.

const iconObj = {
  day: {
    'clear sky': 'sun',
    'few clouds': 'sun',
    'scattered clouds': 'cloud',
    'broken clouds': 'cloud',
    'shower rain': 'cloud-rain',
    'rain': 'cloud-drizzle',
    'thunderstorm': 'cloud-lightning',
    'snow': 'cloud-snow',
    'mist': 'cloud-drizzle'
  },
  night: {
    'clear sky': 'moon',
    'few clouds': 'moon',
    'scattered clouds': 'cloud',
    'broken clouds': 'cloud',
    'shower rain': 'cloud-rain',
    'rain': 'cloud-drizzle',
    'thunderstorm': 'cloud-lightning',
    'snow': 'cloud-snow',
    'mist': 'cloud-drizzle'
  }
}

function setWeatherIcons(data) {
  let weatherDescription = data.weather[0].description;
  let timeOfDay = getTimeOfDay();
  getWeatherIcons(weatherDescription, timeOfDay);
}

function getWeatherIcons(weatherDescription, timeOfDay) {
  let iconName = getWeatherIconNameFrom(weatherDescription, timeOfDay);
  let svg = getSvgFrom(iconName);
  renderNavIcon(svg);
  renderMainIcon(svg);
}

function getWeatherIconNameFrom(weatherDescription, timeOfDay) {
  return iconObj[timeOfDay][weatherDescription] ? iconObj[timeOfDay][weatherDescription] : 'sun';
}

function renderNavIcon(svg) {
  const navIconEl = document.querySelector('.nav-section-mid-area');
  navIconEl.insertAdjacentHTML('beforebegin', svg);
}

function renderMainIcon(svg) {
  const mainIconEl = document.querySelector('.weather-today-subtext');
  mainIconEl.insertAdjacentHTML('beforebegin', svg);
}

function renderIconsFrom(forecasts) {
  let weatherDescriptions = getWeatherDescriptionsFrom(forecasts);
  let targetEls = document.querySelectorAll('.forecast-degrees');

  targetEls.forEach((el, index) => {
    let currentWeatherDesc = weatherDescriptions[index];
    let iconName = getForecastIconNameFrom(currentWeatherDesc)
    let svg = getSvgFrom(iconName);
    el.insertAdjacentHTML('beforebegin', svg);
  })
}

function getWeatherDescriptionsFrom(forecasts) {
  return forecasts
           .map(forecast => {
             return forecast.weather[0].description;
         });
}

function getForecastIconNameFrom(weatherDescription) {
  return iconObj.day[weatherDescription] ? iconObj.day[weatherDescription] : 'sun';
}

function getSvgFrom(iconName) {
  return feather.icons[iconName].toSvg();
}

function getTimeOfDay() {
  let hour = getHour();
  return hour > 7 && hour < 19 ? 'day' : 'night';
}

function getHour() {
  let now = new Date();
  return now.getHours();
}
