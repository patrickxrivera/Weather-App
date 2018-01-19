define(function(require) {

  const Helpers = require('./helpers')
  const Animations = require('./animations');

  // **************************
  // **************************

  const App = (function setupApp(){
    let fahrenheit = true;
    let startPosition;

    const publicAPI = {
      init: initApp,
      getFahrenheit: getFahrenheit
    }

    return publicAPI;

    // **************************

    function initApp() {
      getPositionThen(renderData);
      bindUIActions();
      DateTime.renderDateTime();
    };

    function getPositionThen(successFunc) {
      navigator.geolocation.getCurrentPosition(successFunc)
    }

    async function renderData(position) {
      startPosition = position; // TODO => find a better place to handle this
      let currentWeatherData = await getWeatherFrom(position, 'weatherURL', 'fahrenheit');
      let forecastData = await getWeatherFrom(position, 'forecastURL', 'fahrenheit');
      Data.renderWeatherFrom(currentWeatherData);
      Data.renderForecastFrom(forecastData);
      Icons.renderWeatherIconsFrom(currentWeatherData);
      Icons.renderForecastIconsFrom(forecastData);
      Animations.runAtStart();
    };

    async function getWeatherFrom(position, startURL, unit) {
      let endURL = Helpers[`${startURL}`][`${unit}`];
      let response = await getAPI(position, endURL);
      let data = await response.getData();
      return data;
    }

    function bindUIActions() {
      const slider = document.querySelector('.slider');
      slider.addEventListener('click', toggleUnit);
    }

    async function toggleUnit() {
      let unit;
      fahrenheit ? unit = 'celsius' : unit = 'fahrenheit';
      fahrenheit = !fahrenheit;
      let currentWeatherData = await getWeatherFrom(startPosition, 'weatherURL', unit);
      let forecastData = await getWeatherFrom(startPosition, 'forecastURL', unit);
      Data.renderWeatherFrom(currentWeatherData);
      Data.renderForecastFrom(forecastData);
      Animations.runAtToggle()
    }

    function getFahrenheit() {
      return fahrenheit;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

  }());

  // **************************
  // **************************

  async function getAPI(position, url) { // TODO => improve Module name
    const publicAPI = {
      getData: getData,
      getJSON: getJSON
    }

    return publicAPI;

    // **************************

    async function getData() {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let currentLocationURL = `${url}&lat=${lat}&lon=${lon}`;
      let data = await getJSON(currentLocationURL);
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
  };

  const Data = (function renderData() {
    const publicAPI = {
      renderWeatherFrom: renderWeatherFrom,
      renderForecastFrom: renderForecastFrom,
      getNextFiveDaysFrom: getNextFiveDaysFrom
    }

    return publicAPI;

    // **************************

    function renderWeatherFrom(currentWeatherData) { // TODO => modularize this function
      let tempEl = document.querySelector('.weather-today-degrees');
      let windEl = document.querySelector('.weather-today-subtext');
      let cityEl = document.querySelector('.location-area .current-city');
      let countryEl = document.querySelector('.location-area .current-country');
      let temp = Math.round(currentWeatherData.main.temp);
      let wind = Math.round(currentWeatherData.wind.speed);
      let city = currentWeatherData.name;
      let country = currentWeatherData.sys.country;
      let isFahrenheit = App.getFahrenheit();
      let unit = isFahrenheit ? 'mph' : 'mps';
      windEl.textContent = `${wind}${unit}`;
      tempEl.textContent = temp + Helpers.getDegreesSymbol();
      cityEl.textContent = `${city}, `;
      countryEl.textContent = country;
    }

    function renderForecastFrom(forecastData) {
      let fiveDayForecastData = getNextFiveDaysFrom(forecastData);
      renderDays(fiveDayForecastData);
    }

    function renderDays(fiveDayForecastData) {
      let dayNames = getDayNamesFrom(fiveDayForecastData);
      let avgTemps = getAvgTempsFrom(fiveDayForecastData);
      renderForecasted(dayNames, 'days');
      renderForecasted(avgTemps, 'temps');
    }

    function getNextFiveDaysFrom(data) {
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

      // console.log({currentHourAdjusted, forecastHour});

      return forecastHour === currentHourAdjusted || forecastHour === currentHourAdjusted + 1 || forecastHour === currentHourAdjusted + 2;
    }

    function getCurrentHour() {
      let now = new Date();
      return now.getHours();
    }

    function getDayNamesFrom(forecasts) {
      let days = [];
      forecasts.forEach(forecast => {
        let date = new Date(forecast.dt * 1000);
        let day = DateTime.getDay(date)
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
  }());

  // **************************
  // **************************

  const Icons = (function renderIcons() {
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

    const publicAPI = {
      renderWeatherIconsFrom: renderWeatherIconsFrom,
      renderForecastIconsFrom: renderForecastIconsFrom
    }

    return publicAPI;

    // **************************

    function renderWeatherIconsFrom(data) {
      let weatherDescription = data.weather[0].description;
      let timeOfDay = Helpers.getTimeOfDay();
      getWeatherIcons(weatherDescription, timeOfDay);
    }

    function getWeatherIcons(weatherDescription, timeOfDay) {
      let iconName = getWeatherIconNameFrom(weatherDescription, timeOfDay);
      let svg = Helpers.getSvgFor(iconName);
      Header.setHeaderArea(iconName);
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

    function renderForecastIconsFrom(forecasts) {
      let fiveDayForecastData = Data.getNextFiveDaysFrom(forecasts);
      let weatherDescriptions = getWeatherDescriptionsFrom(fiveDayForecastData);
      let targetEls = document.querySelectorAll('.forecast-degrees');

      targetEls.forEach((el, index) => {
        let currentWeatherDesc = weatherDescriptions[index];
        let iconName = getForecastIconNameFrom(currentWeatherDesc)
        // iconName = 'cloud-lightning';
        let svg = Helpers.getSvgFor(iconName);
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

  }());

  // **************************
  // **************************

  const Header = (function renderHeaderArea() {
    const publicAPI = {
      setHeaderArea: setHeaderArea
    }

    return publicAPI;

    // **************************

    function setHeaderArea(iconName) { // TODO => better name
      let timeOfDay = Helpers.getTimeOfDay();
      let type = getTypeFrom(timeOfDay, iconName); // TODO => name
      renderHeaderAreaFrom(type);
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

    function renderHeaderAreaFrom(key) {
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
      let headerIconSvg = Helpers.getSvgFor('clock');
      let headerIconEl = document.querySelector('.location-and-time-area .time-icon');
      headerIconEl.insertAdjacentHTML('afterbegin', headerIconSvg);
    }
  }());

  // **************************
  // **************************

  const DateTime = (function setupDateTime() {
    const publicAPI = {
      renderDateTime: renderDateTime,
      getDay: getDay
    }

    return publicAPI;

    // **************************

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

  }());

  App.init();

});
