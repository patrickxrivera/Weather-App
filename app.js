const Helpers = {
  weatherURL: 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',
  forecastURL: 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',

  getDegreesSymbol() {
    return String.fromCharCode(176);
  }
};

const App = (function setupApp(){
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
  let fahrenheit = true;
  let startPosition;

  const publicAPI = {
    init: initApp,
    renderDateTime: renderDateTime,
  }

  return publicAPI;

  // **************************

  function initApp() {
    bindUIActions();
    renderDateTime();
    navigator.geolocation.getCurrentPosition(getCurrent, error);
  };

  function bindUIActions() {
    const slider = document.querySelector('.slider');
    slider.addEventListener('click', toggleUnit);
  }

  async function toggleUnit() {
    let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
    let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?mode=json&appid=e7819a0645bb3723fbfe223ad074c870';
    let unit;
    fahrenheit ? unit = 'metric' : unit = 'imperial';
    weatherUrl += `&units=${unit}`;
    forecastUrl += `&units=${unit}`;
    let weatherData = await getData(startPosition, weatherUrl);
    let forecastData = await getData(startPosition, forecastUrl);
    renderWeather(weatherData);
    renderDays(forecastData);
    fahrenheit = !fahrenheit;
  }

  async function getCurrent(position) {
    let currentWeatherData = await getWeatherFrom(position, 'weatherURL');
    let forecastData = await getWeatherFrom(position, 'forecastURL');
    Data.renderCurrentWeather(currentWeatherData);
    Data.renderForecastFrom(forecastData);

    let fiveDayForecastDataTest = getNextFiveDays(forecastData);
    renderDays(fiveDayForecastDataTest);
    renderIconsFrom(fiveDayForecastDataTest)
  };

  async function getWeatherFrom(position, startUrl) {
    let endUrl = Helpers[`${startUrl}`];
    let call = await APICall(position, endUrl);
    let data = await call.getData();
    return data;
  }

  function renderDays(fiveDayForecastData) {
    // let fiveDayForecastData = getNextFiveDays(data);
    let dayNames = getDayNamesFrom(fiveDayForecastData);
    let avgTemps = getAvgTempsFrom(fiveDayForecastData);
    renderForecasted(dayNames, 'days');
    renderForecasted(avgTemps, 'temps');
  }

  function getNextFiveDays(data) {
    let forecastData =
      data
      .list
      .filter(forecast => {
        return isTargetTime(forecast);
      })

    if (forecastData.length === 6) {
      forecastData.shift();
    }

    return forecastData;
  }

  function isTargetTime(forecast) {
    // TODO => think of a better way to get proper forecast dates and times
    let date = new Date(forecast.dt * 1000);
    let forecastHour = date.getHours();
    let currentHour = getCurrentHour();
    let currentHourAdjusted = currentHour + 3;

    if (currentHourAdjusted > 23) {
      currentHourAdjusted -= 24;
    }

    return forecastHour === currentHourAdjusted ||
           forecastHour === currentHourAdjusted + 1 ||
           forecastHour === currentHourAdjusted + 2;
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
      let output = type === 'temps' ? data[index] + Helpers.getDegreesSymbol() : data[index]; // TODO
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

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  function renderDateTime() { // TODO
    let now = new Date();
    setDate(now);
    setDay(now);
    setTime(now);
  };

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

  function renderIconsFrom(forecasts) {
    let weatherDescriptions = getWeatherDescriptionsFrom(forecasts);
    let targetEls = document.querySelectorAll('.forecast-degrees');

    targetEls.forEach((el, index) => {
      let currentWeatherDesc = weatherDescriptions[index];
      let iconName = getForecastIconNameFrom(currentWeatherDesc)
      // iconName = 'cloud-lightning';
      let svg = getSvgFor(iconName);
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

  function setCardArea(iconName) { // TODO => better name
    let timeOfDay = getTimeOfDay();
    let type = getTypeFrom(timeOfDay, iconName); // TODO => name
    renderCardAreaFrom(type);
  };

  function getTypeFrom(timeOfDay, iconName) {
    let typeObj = {
      'sun': 'sunny',
      'cloud': 'cloudy',
      'cloud-rain': 'rainy',
      'cloud-drizzle': 'rainy',
      'cloud-lightning': 'cloudy',
      'cloud-snow': 'cloudy'
    };
    let type; // TODO => name

    if (timeOfDay === 'day') {
      type = typeObj[iconName];
    }
    else {
      type = timeOfDay;
    }
    return type;
  }

  function renderCardAreaFrom(key) {
    renderColorsUsing(key);
    renderHeaderIcon();
  }

  function renderColorsUsing(key) {
    let cardColorsObj = {
      night: {
        primaryColor: '#fff',
        secondaryColor: '#2c3e50'
      },
      sunny: {
        primaryColor: '#2c3e50',
        secondaryColor: '#fcf3d2'
      },
      cloudy: {
        primaryColor: '#2c3e50',
        secondaryColor: '#ecf0f1'
      },
      rainy: {
        primaryColor: '#fff',
        secondaryColor: '#3498db'
      }
    }
    document.documentElement.style.setProperty('--secondaryColor', cardColorsObj[key].secondaryColor);
    document.documentElement.style.setProperty('--primaryColor', cardColorsObj[key].primaryColor);
  }

  function renderHeaderIcon() {
    let headerIconSvg = getSvgFor('clock');
    let headerIconEl = document.querySelector('.location-and-time-area .time-icon');
    headerIconEl.insertAdjacentHTML('afterbegin', headerIconSvg);
  }

  function getSvgFor(iconName) {
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

}());

// **************************
// **************************

async function APICall(position, url) { // TODO => improve Module name
  const publicAPI = {
    getData: getData,
    getJSON: getJSON
  }

  return publicAPI;

  // **************************

  async function getData() {
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
}

// **************************
// **************************

const UI = (function renderData() {
  const publicAPI = {
    renderCurrentWeather: renderCurrentWeather
  }

  return publicAPI;

  // **************************

  function renderCurrentWeather(data) { // TODO => modularize this function
    let tempEl = document.querySelector('.weather-today-degrees');
    let windEl = document.querySelector('.weather-today-subtext');
    let cityEl = document.querySelector('.location-area .current-city');
    let countryEl = document.querySelector('.location-area .current-country');
    let temp = Math.round(data.main.temp);
    let wind = Math.round(data.wind.speed);
    let city = data.name;
    let country = data.sys.country;
    windEl.textContent = `${wind}mph`;
    tempEl.textContent = temp + Helpers.getDegreesSymbol();
    cityEl.textContent = `${city}, `;
    countryEl.textContent = country;
  }
}());

function Icons(data) {

  const publicAPI = {
    setCurrentWeather: setCurrentWeather
  }

  return publicAPI;

  // **************************

  function setCurrentWeather() {
    let weatherDescription = data.weather[0].description;
    let timeOfDay = getTimeOfDay();
    getWeatherIcons(weatherDescription, timeOfDay);
  }

  function getWeatherIcons(weatherDescription, timeOfDay) {
    let iconName = getWeatherIconNameFrom(weatherDescription, timeOfDay);
    let svg = getSvgFor(iconName);
    setCardArea(iconName);
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

}

App.init();
