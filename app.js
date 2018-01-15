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
  tempEl.textContent = temp;
  cityEl.textContent = `${city}, `;
  countryEl.textContent = country;
  renderCurrentWeatherIcons(data);
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
}

function getNextFiveDays(data) {
  let forecastData = data.list
    .filter(forecast => {
      return isTargetTime(forecast);
    })

  if (forecastData.length === 6) {
    forecastData.shift();
  }

  return forecastData;
}

function isTargetTime(forecast) {
  let date = new Date(forecast.dt * 1000);
  return date.getHours() === 11 ||
         date.getHours() === 12 ||
         date.getHours() === 13;
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
  let formattedDays = days
    .map(day => {
      return day.slice(0, 3).toUpperCase();
    })
  return formattedDays;
}

function renderForecasted(data, type) {
  let targetClass = getTargetClassFromData(type);
  let targetEls = document.querySelectorAll(targetClass);
  targetEls.forEach((targetEl, index) => {
    targetEl.textContent = data[index];
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

function renderCurrentWeatherIcons(data) {
  let weatherDescription = data.weather[0].description;
  let hour = getHour();
  let timeOfDay = hour > 7 || hour < 19 ? 'day' : 'night';
  const iconObj = {
    day: {
      'clear sky': {
        name: 'sun'
      }
    },
    night: {
      'clear sky': {
        name: 'moon'
      }
    }
  }
  const weatherIconNavEl = document.querySelector('.nav-section-mid-area');
  let iconName = iconObj[`${timeOfDay}`][`${weatherDescription}`].name;
  let svg = feather.icons[iconName].toSvg( {class: 'sun'} );
  weatherIconNavEl.insertAdjacentHTML('beforebegin', svg);
}

function getHour() {
  let now = new Date();
  return now.getHours();
}
