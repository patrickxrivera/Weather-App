(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _helpersHelpers = require('./helpers/helpers');

var Helpers = _interopRequireWildcard(_helpersHelpers);

var _animationsAnimations = require('./animations/animations');

var Animations = _interopRequireWildcard(_animationsAnimations);

console.log('working');
// **************************
// **************************

var App = (function setupApp() {
  var fahrenheit = true;
  var startPosition = undefined;

  var publicAPI = {
    init: initApp,
    getFahrenheit: getFahrenheit
  };

  return publicAPI;

  // **************************

  function initApp() {
    getPositionThen(renderData);
    bindUIActions();
    DateTime.renderDateTime();
  };

  function getPositionThen(successFunc) {
    navigator.geolocation.getCurrentPosition(successFunc);
  }

  function renderData(position) {
    var currentWeatherData, forecastData;
    return regeneratorRuntime.async(function renderData$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          startPosition = position; // TODO => find a better place to handle this
          context$2$0.next = 3;
          return regeneratorRuntime.awrap(getWeatherFrom(position, 'weatherURL', 'fahrenheit'));

        case 3:
          currentWeatherData = context$2$0.sent;
          context$2$0.next = 6;
          return regeneratorRuntime.awrap(getWeatherFrom(position, 'forecastURL', 'fahrenheit'));

        case 6:
          forecastData = context$2$0.sent;

          Data.renderWeatherFrom(currentWeatherData);
          Data.renderForecastFrom(forecastData);
          Icons.renderWeatherIconsFrom(currentWeatherData);
          Icons.renderForecastIconsFrom(forecastData);
          Animations.runAtStart();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  };

  function getWeatherFrom(position, startURL, unit) {
    var endURL, response, data;
    return regeneratorRuntime.async(function getWeatherFrom$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          endURL = Helpers['' + startURL]['' + unit];
          context$2$0.next = 3;
          return regeneratorRuntime.awrap(API.getAPI(position, endURL));

        case 3:
          response = context$2$0.sent;
          context$2$0.next = 6;
          return regeneratorRuntime.awrap(response.getData());

        case 6:
          data = context$2$0.sent;
          return context$2$0.abrupt('return', data);

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  function bindUIActions() {
    var slider = document.querySelector('.slider');
    slider.addEventListener('click', toggleUnit);
  }

  function toggleUnit() {
    var unit, currentWeatherData, forecastData;
    return regeneratorRuntime.async(function toggleUnit$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          unit = undefined;

          fahrenheit ? unit = 'celsius' : unit = 'fahrenheit';
          fahrenheit = !fahrenheit;
          context$2$0.next = 5;
          return regeneratorRuntime.awrap(getWeatherFrom(startPosition, 'weatherURL', unit));

        case 5:
          currentWeatherData = context$2$0.sent;
          context$2$0.next = 8;
          return regeneratorRuntime.awrap(getWeatherFrom(startPosition, 'forecastURL', unit));

        case 8:
          forecastData = context$2$0.sent;

          Data.renderWeatherFrom(currentWeatherData);
          Data.renderForecastFrom(forecastData);
          Animations.runAtToggle();

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  function getFahrenheit() {
    return fahrenheit;
  }

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
})();

// **************************
// **************************

function getAPI(position, url) {
  var publicAPI, getData, getJSON;
  return regeneratorRuntime.async(function getAPI$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        getJSON = function getJSON(url) {
          var response, data;
          return regeneratorRuntime.async(function getJSON$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return regeneratorRuntime.awrap(fetch(url));

              case 3:
                response = context$2$0.sent;
                context$2$0.next = 6;
                return regeneratorRuntime.awrap(response.json());

              case 6:
                data = context$2$0.sent;
                return context$2$0.abrupt('return', data);

              case 10:
                context$2$0.prev = 10;
                context$2$0.t0 = context$2$0['catch'](0);

                console.warn('Error', e);

              case 13:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this, [[0, 10]]);
        };

        getData = function getData() {
          var lat, lon, currentLocationURL, data;
          return regeneratorRuntime.async(function getData$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                currentLocationURL = url + '&lat=' + lat + '&lon=' + lon;
                context$2$0.next = 5;
                return regeneratorRuntime.awrap(getJSON(currentLocationURL));

              case 5:
                data = context$2$0.sent;
                return context$2$0.abrupt('return', data);

              case 7:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        publicAPI = {
          getData: getData,
          getJSON: getJSON
        };
        return context$1$0.abrupt('return', publicAPI);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// **************************
// **************************

var Data = (function renderData() {
  var publicAPI = {
    renderWeatherFrom: renderWeatherFrom,
    renderForecastFrom: renderForecastFrom,
    getNextFiveDaysFrom: getNextFiveDaysFrom
  };

  return publicAPI;

  // **************************

  function renderWeatherFrom(currentWeatherData) {
    // TODO => modularize this function
    var tempEl = document.querySelector('.weather-today-degrees');
    var windEl = document.querySelector('.weather-today-subtext');
    var cityEl = document.querySelector('.location-area .current-city');
    var countryEl = document.querySelector('.location-area .current-country');
    var temp = Math.round(currentWeatherData.main.temp);
    var wind = Math.round(currentWeatherData.wind.speed);
    var city = currentWeatherData.name;
    var country = currentWeatherData.sys.country;
    var isFahrenheit = App.getFahrenheit();
    var unit = isFahrenheit ? 'mph' : 'mps';
    windEl.textContent = '' + wind + unit;
    tempEl.textContent = temp + Helpers.getDegreesSymbol();
    cityEl.textContent = city + ', ';
    countryEl.textContent = country;
  }

  function renderForecastFrom(forecastData) {
    var fiveDayForecastData = getNextFiveDaysFrom(forecastData);
    renderDays(fiveDayForecastData);
  }

  function renderDays(fiveDayForecastData) {
    var dayNames = getDayNamesFrom(fiveDayForecastData);
    var avgTemps = getAvgTempsFrom(fiveDayForecastData);
    renderForecasted(dayNames, 'days');
    renderForecasted(avgTemps, 'temps');
  }

  function getNextFiveDaysFrom(data) {
    var forecastData = data.list.filter(function (forecast) {
      return isTargetTime(forecast);
    });

    if (forecastData.length === 6) {
      forecastData.shift();
    }

    return forecastData;
  }

  function isTargetTime(forecast) {
    // TODO => think of a better way to get proper forecast dates and times
    var date = new Date(forecast.dt * 1000);
    var forecastHour = date.getHours();
    var currentHour = getCurrentHour();
    var currentHourAdjusted = currentHour + 3;

    if (currentHourAdjusted > 23) {
      currentHourAdjusted -= 24;
    }

    // console.log({currentHourAdjusted, forecastHour});

    return forecastHour === currentHourAdjusted || forecastHour === currentHourAdjusted + 1 || forecastHour === currentHourAdjusted + 2;
  }

  function getCurrentHour() {
    var now = new Date();
    return now.getHours();
  }

  function getDayNamesFrom(forecasts) {
    var days = [];
    forecasts.forEach(function (forecast) {
      var date = new Date(forecast.dt * 1000);
      var day = DateTime.getDay(date);
      if (!days.includes(day)) {
        days.push(day);
      };
    });
    var formattedDays = format(days);
    return formattedDays;
  }

  function format(days) {
    var formattedDays = days.map(function (day) {
      return day.slice(0, 3).toUpperCase();
    });
    return formattedDays;
  }

  function renderForecasted(data, type) {
    var targetClass = getTargetClassFromData(type);
    var targetEls = document.querySelectorAll(targetClass);
    targetEls.forEach(function (el, index) {
      var output = type === 'temps' ? data[index] + Helpers.getDegreesSymbol() : data[index]; // TODO
      el.textContent = output;
    });
  }

  function getTargetClassFromData(type) {
    return type === 'days' ? '.forecast-weekday' : '.forecast-degrees';
  }

  function getAvgTempsFrom(forecasts) {
    var avgTemps = forecasts.map(function (forecast) {
      var avgTemp = Math.round(forecast.main.temp);
      return avgTemp;
    });
    return avgTemps;
  }
})();

// **************************
// **************************

var Icons = (function renderIcons() {
  var iconObj = {
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
  };

  var publicAPI = {
    renderWeatherIconsFrom: renderWeatherIconsFrom,
    renderForecastIconsFrom: renderForecastIconsFrom
  };

  return publicAPI;

  // **************************

  function renderWeatherIconsFrom(data) {
    var weatherDescription = data.weather[0].description;
    var timeOfDay = Helpers.getTimeOfDay();
    getWeatherIcons(weatherDescription, timeOfDay);
  }

  function getWeatherIcons(weatherDescription, timeOfDay) {
    var iconName = getWeatherIconNameFrom(weatherDescription, timeOfDay);
    var svg = Helpers.getSvgFor(iconName);
    Header.setHeaderArea(iconName);
    renderNavIcon(svg);
    renderMainIcon(svg);
  }

  function getWeatherIconNameFrom(weatherDescription, timeOfDay) {
    return iconObj[timeOfDay][weatherDescription] ? iconObj[timeOfDay][weatherDescription] : 'sun';
  }

  function renderNavIcon(svg) {
    var navIconEl = document.querySelector('.nav-section-mid-area');
    navIconEl.insertAdjacentHTML('beforebegin', svg);
  }

  function renderMainIcon(svg) {
    var mainIconEl = document.querySelector('.weather-today-subtext');
    mainIconEl.insertAdjacentHTML('beforebegin', svg);
  }

  function renderForecastIconsFrom(forecasts) {
    var fiveDayForecastData = Data.getNextFiveDaysFrom(forecasts);
    var weatherDescriptions = getWeatherDescriptionsFrom(fiveDayForecastData);
    var targetEls = document.querySelectorAll('.forecast-degrees');

    targetEls.forEach(function (el, index) {
      var currentWeatherDesc = weatherDescriptions[index];
      var iconName = getForecastIconNameFrom(currentWeatherDesc);
      // iconName = 'cloud-lightning';
      var svg = Helpers.getSvgFor(iconName);
      el.insertAdjacentHTML('beforebegin', svg);
    });
  }

  function getWeatherDescriptionsFrom(forecasts) {
    return forecasts.map(function (forecast) {
      return forecast.weather[0].description;
    });
  }

  function getForecastIconNameFrom(weatherDescription) {
    return iconObj.day[weatherDescription] ? iconObj.day[weatherDescription] : 'sun';
  }
})();

// **************************
// **************************

var Header = (function renderHeaderArea() {
  var publicAPI = {
    setHeaderArea: setHeaderArea
  };

  return publicAPI;

  // **************************

  function setHeaderArea(iconName) {
    // TODO => better name
    var timeOfDay = Helpers.getTimeOfDay();
    var type = getTypeFrom(timeOfDay, iconName); // TODO => name
    renderHeaderAreaFrom(type);
  };

  function getTypeFrom(timeOfDay, iconName) {
    var typeObj = {
      'sun': 'sunny',
      'cloud': 'cloudy',
      'cloud-rain': 'rainy',
      'cloud-drizzle': 'rainy',
      'cloud-lightning': 'cloudy',
      'cloud-snow': 'cloudy'
    };
    var type = undefined; // TODO => name

    if (timeOfDay === 'day') {
      type = typeObj[iconName];
    } else {
      type = timeOfDay;
    }
    return type;
  }

  function renderHeaderAreaFrom(key) {
    renderColorsUsing(key);
    renderHeaderIcon();
  }

  function renderColorsUsing(key) {
    var cardColorsObj = {
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
    };
    document.documentElement.style.setProperty('--secondaryColor', cardColorsObj[key].secondaryColor);
    document.documentElement.style.setProperty('--primaryColor', cardColorsObj[key].primaryColor);
  }

  function renderHeaderIcon() {
    var headerIconSvg = Helpers.getSvgFor('clock');
    var headerIconEl = document.querySelector('.location-and-time-area .time-icon');
    headerIconEl.insertAdjacentHTML('afterbegin', headerIconSvg);
  }
})();

// **************************
// **************************

var DateTime = (function setupDateTime() {
  var publicAPI = {
    renderDateTime: renderDateTime,
    getDay: getDay
  };

  return publicAPI;

  // **************************

  function renderDateTime() {
    // TODO
    var now = new Date();
    setDate(now);
    setDay(now);
    setTime(now);
  };

  function setDate(now) {
    var date = getDate(now);
    renderDate(date);
  }

  function setDay(now) {
    var day = getDay(now);
    renderDay(day);
  }

  function setTime(now) {
    var time = getTime(now);
    renderTime(time);
  }

  function getDate(now) {
    var date = now.getDate();
    return addSuffixTo(date);
  }

  function getDay(now) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayNum = now.getDay();
    var dayName = days[dayNum];
    return dayName;
  }

  function getTime(now) {
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
    return time;
  }

  function addSuffixTo(date) {
    var suffix = getSuffixOf(date);
    return date + suffix;
  }

  function getSuffixOf(date) {
    var suffix = undefined;
    var remainder = date % 10;

    if (remainder === 1 && date !== 11) {
      suffix = 'st';
    } else if (remainder === 2 && date !== 12) {
      suffix = 'nd';
    } else if (remainder === 3 && date !== 13) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }

    return suffix;
  }

  function renderDate(date) {
    var dateEl = document.querySelector('.weather-today-area .weather-today-date');
    dateEl.textContent = date;
  }

  function renderDay(day) {
    var dayEl = document.querySelector('.weather-today-area .weather-today-weekday');
    dayEl.textContent = day;
  }

  function renderTime(time) {
    var timeEl = document.querySelector('.location-and-time-area .time-text');
    timeEl.textContent = time;
  }
})();

App.init();
// TODO => improve Module name

// **************************

},{"./animations/animations":2,"./helpers/helpers":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getAnimations = getAnimations;

function getAnimations() {

  var publicAPI = {
    runAtStart: runAtStart,
    runAtToggle: runAtToggle
  };

  return publicAPI;

  // **************************

  function runAtStart() {
    var mainContainer = document.querySelector('.main-container');
    var currentWeatherArea = document.querySelector('.center-experiment');
    var forecastArea = document.querySelectorAll('.forecast-area');
    mainContainer.classList.remove('hide-container');
    mainContainer.classList.add('show-container');
    currentWeatherArea.classList.add('animated', 'fadeInLeft');
    forecastArea.forEach(function (el) {
      el.classList.add('animated', 'fadeIn');
    });
  }

  function runAtToggle() {
    var currentWeatherDegrees = document.querySelector('.weather-today-degrees');
    var currentWeatherWind = document.querySelector('.weather-today-subtext');
    var forecastDegrees = document.querySelectorAll('.forecast-degrees');
    currentWeatherDegrees.classList.add('animated', 'fadeIn');
    currentWeatherDegrees.addEventListener('animationend', function () {
      currentWeatherDegrees.classList.remove('fadeIn');
    });
    currentWeatherWind.classList.add('animated', 'fadeIn');
    currentWeatherWind.addEventListener('animationend', function () {
      currentWeatherWind.classList.remove('fadeIn');
    });
    forecastDegrees.forEach(function (forecast) {
      forecast.classList.add('animated', 'fadeIn');
      forecast.addEventListener('animationend', function () {
        forecast.classList.remove('fadeIn');
      });
    });
  }
}

;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var Helpers = {
  weatherURL: {
    fahrenheit: 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',
    celsius: 'https://api.openweathermap.org/data/2.5/weather?units=metric&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  },
  forecastURL: {
    fahrenheit: 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',
    celsius: 'https://api.openweathermap.org/data/2.5/forecast?units=metric&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  },

  getDegreesSymbol: function getDegreesSymbol() {
    return String.fromCharCode(176);
  },

  getTimeOfDay: function getTimeOfDay() {
    var hour = this.getHour();
    return hour > 7 && hour < 19 ? 'day' : 'night';
  },

  getHour: function getHour() {
    var now = new Date();
    return now.getHours();
  },

  getSvgFor: function getSvgFor(iconName) {
    return feather.icons[iconName].toSvg();
  }
};
exports.Helpers = Helpers;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9TaXRlcy9TaWRlIFByb2plY3RzL0ZDQy9XZWF0aGVyLUFwcC9hcHAvbWFpbi5qcyIsIkM6L1NpdGVzL1NpZGUgUHJvamVjdHMvRkNDL1dlYXRoZXItQXBwL2FwcC9hbmltYXRpb25zL2FuaW1hdGlvbnMuanMiLCJDOi9TaXRlcy9TaWRlIFByb2plY3RzL0ZDQy9XZWF0aGVyLUFwcC9hcHAvaGVscGVycy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs4QkNBeUIsbUJBQW1COztJQUFoQyxPQUFPOztvQ0FDUyx5QkFBeUI7O0lBQXpDLFVBQVU7O0FBRXRCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Ozs7QUFJdkIsSUFBTSxHQUFHLEdBQUksQ0FBQSxTQUFTLFFBQVEsR0FBRTtBQUM5QixNQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdEIsTUFBSSxhQUFhLFlBQUEsQ0FBQzs7QUFFbEIsTUFBTSxTQUFTLEdBQUc7QUFDaEIsUUFBSSxFQUFFLE9BQU87QUFDYixpQkFBYSxFQUFFLGFBQWE7R0FDN0IsQ0FBQTs7QUFFRCxTQUFPLFNBQVMsQ0FBQzs7OztBQUlqQixXQUFTLE9BQU8sR0FBRztBQUNqQixtQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVCLGlCQUFhLEVBQUUsQ0FBQztBQUNoQixZQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7R0FDM0IsQ0FBQzs7QUFFRixXQUFTLGVBQWUsQ0FBQyxXQUFXLEVBQUU7QUFDcEMsYUFBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQUN0RDs7QUFFRCxXQUFlLFVBQVUsQ0FBQyxRQUFRO1FBRTVCLGtCQUFrQixFQUNsQixZQUFZOzs7O0FBRmhCLHVCQUFhLEdBQUcsUUFBUSxDQUFDOzswQ0FDTSxjQUFjLENBQUMsUUFBUSxFQUFFLFlBQVksRUFB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QUFDbEMsY0FBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzdDLGNBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtBQUM5QyxnQkFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7T0FDckMsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0o7Q0FDRjs7QUFBQSxDQUFDOzs7Ozs7OztBQzFDSyxJQUFNLE9BQU8sR0FBRztBQUNyQixZQUFVLEVBQUU7QUFDVixjQUFVLEVBQUUsaUhBQWlIO0FBQzdILFdBQU8sRUFBRSwrR0FBK0c7R0FDekg7QUFDRCxhQUFXLEVBQUU7QUFDWCxjQUFVLEVBQUUsa0hBQWtIO0FBQzlILFdBQU8sRUFBRSxnSEFBZ0g7R0FDMUg7O0FBRUQsa0JBQWdCLEVBQUEsNEJBQUc7QUFDakIsV0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ2pDOztBQUVELGNBQVksRUFBQSx3QkFBRztBQUNiLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQixXQUFPLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsT0FBTyxDQUFDO0dBQ2hEOztBQUVELFNBQU8sRUFBQSxtQkFBRztBQUNSLFFBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDckIsV0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7R0FDdkI7O0FBRUQsV0FBUyxFQUFBLG1CQUFDLFFBQVEsRUFBRTtBQUNsQixXQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7R0FDeEM7Q0FDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIEhlbHBlcnMgZnJvbSAnLi9oZWxwZXJzL2hlbHBlcnMnO1xyXG5pbXBvcnQgKiBhcyBBbmltYXRpb25zIGZyb20gJy4vYW5pbWF0aW9ucy9hbmltYXRpb25zJztcclxuXHJcbmNvbnNvbGUubG9nKCd3b3JraW5nJyk7XHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5jb25zdCBBcHAgPSAoZnVuY3Rpb24gc2V0dXBBcHAoKXtcclxuICBsZXQgZmFocmVuaGVpdCA9IHRydWU7XHJcbiAgbGV0IHN0YXJ0UG9zaXRpb247XHJcblxyXG4gIGNvbnN0IHB1YmxpY0FQSSA9IHtcclxuICAgIGluaXQ6IGluaXRBcHAsXHJcbiAgICBnZXRGYWhyZW5oZWl0OiBnZXRGYWhyZW5oZWl0XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHVibGljQVBJO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICBmdW5jdGlvbiBpbml0QXBwKCkge1xyXG4gICAgZ2V0UG9zaXRpb25UaGVuKHJlbmRlckRhdGEpO1xyXG4gICAgYmluZFVJQWN0aW9ucygpO1xyXG4gICAgRGF0ZVRpbWUucmVuZGVyRGF0ZVRpbWUoKTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBnZXRQb3NpdGlvblRoZW4oc3VjY2Vzc0Z1bmMpIHtcclxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc3VjY2Vzc0Z1bmMpXHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiByZW5kZXJEYXRhKHBvc2l0aW9uKSB7XHJcbiAgICBzdGFydFBvc2l0aW9uID0gcG9zaXRpb247IC8vIFRPRE8gPT4gZmluZCBhIGJldHRlciBwbGFjZSB0byBoYW5kbGUgdGhpc1xyXG4gICAgbGV0IGN1cnJlbnRXZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXJGcm9tKHBvc2l0aW9uLCAnd2VhdGhlclVSTCcsICdmYWhyZW5oZWl0Jyk7XHJcbiAgICBsZXQgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0V2VhdGhlckZyb20ocG9zaXRpb24sICdmb3JlY2FzdFVSTCcsICdmYWhyZW5oZWl0Jyk7XHJcbiAgICBEYXRhLnJlbmRlcldlYXRoZXJGcm9tKGN1cnJlbnRXZWF0aGVyRGF0YSk7XHJcbiAgICBEYXRhLnJlbmRlckZvcmVjYXN0RnJvbShmb3JlY2FzdERhdGEpO1xyXG4gICAgSWNvbnMucmVuZGVyV2VhdGhlckljb25zRnJvbShjdXJyZW50V2VhdGhlckRhdGEpO1xyXG4gICAgSWNvbnMucmVuZGVyRm9yZWNhc3RJY29uc0Zyb20oZm9yZWNhc3REYXRhKTtcclxuICAgIEFuaW1hdGlvbnMucnVuQXRTdGFydCgpO1xyXG4gIH07XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJGcm9tKHBvc2l0aW9uLCBzdGFydFVSTCwgdW5pdCkge1xyXG4gICAgbGV0IGVuZFVSTCA9IEhlbHBlcnNbYCR7c3RhcnRVUkx9YF1bYCR7dW5pdH1gXTtcclxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IEFQSS5nZXRBUEkocG9zaXRpb24sIGVuZFVSTCk7XHJcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmdldERhdGEoKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYmluZFVJQWN0aW9ucygpIHtcclxuICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zbGlkZXInKTtcclxuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVVuaXQpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gdG9nZ2xlVW5pdCgpIHtcclxuICAgIGxldCB1bml0O1xyXG4gICAgZmFocmVuaGVpdCA/IHVuaXQgPSAnY2Vsc2l1cycgOiB1bml0ID0gJ2ZhaHJlbmhlaXQnO1xyXG4gICAgZmFocmVuaGVpdCA9ICFmYWhyZW5oZWl0O1xyXG4gICAgbGV0IGN1cnJlbnRXZWF0aGVyRGF0YSA9IGF3YWl0IGdldFdlYXRoZXJGcm9tKHN0YXJ0UG9zaXRpb24sICd3ZWF0aGVyVVJMJywgdW5pdCk7XHJcbiAgICBsZXQgZm9yZWNhc3REYXRhID0gYXdhaXQgZ2V0V2VhdGhlckZyb20oc3RhcnRQb3NpdGlvbiwgJ2ZvcmVjYXN0VVJMJywgdW5pdCk7XHJcbiAgICBEYXRhLnJlbmRlcldlYXRoZXJGcm9tKGN1cnJlbnRXZWF0aGVyRGF0YSk7XHJcbiAgICBEYXRhLnJlbmRlckZvcmVjYXN0RnJvbShmb3JlY2FzdERhdGEpO1xyXG4gICAgQW5pbWF0aW9ucy5ydW5BdFRvZ2dsZSgpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRGYWhyZW5oZWl0KCkge1xyXG4gICAgcmV0dXJuIGZhaHJlbmhlaXQ7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBlcnJvcihlcnIpIHtcclxuICAgIGNvbnNvbGUud2FybihgRVJST1IoJHtlcnIuY29kZX0pOiAke2Vyci5tZXNzYWdlfWApO1xyXG4gIH07XHJcblxyXG59KCkpO1xyXG5cclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldEFQSShwb3NpdGlvbiwgdXJsKSB7IC8vIFRPRE8gPT4gaW1wcm92ZSBNb2R1bGUgbmFtZVxyXG4gIGNvbnN0IHB1YmxpY0FQSSA9IHtcclxuICAgIGdldERhdGE6IGdldERhdGEsXHJcbiAgICBnZXRKU09OOiBnZXRKU09OXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHVibGljQVBJO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgbGV0IGxhdCA9IHBvc2l0aW9uLmNvb3Jkcy5sYXRpdHVkZTtcclxuICAgIGxldCBsb24gPSBwb3NpdGlvbi5jb29yZHMubG9uZ2l0dWRlO1xyXG4gICAgbGV0IGN1cnJlbnRMb2NhdGlvblVSTCA9IGAke3VybH0mbGF0PSR7bGF0fSZsb249JHtsb259YDtcclxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0SlNPTihjdXJyZW50TG9jYXRpb25VUkwpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmdW5jdGlvbiBnZXRKU09OKHVybCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcclxuICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgY2F0Y2goZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignRXJyb3InLCBlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuY29uc3QgRGF0YSA9IChmdW5jdGlvbiByZW5kZXJEYXRhKCkge1xyXG4gIGNvbnN0IHB1YmxpY0FQSSA9IHtcclxuICAgIHJlbmRlcldlYXRoZXJGcm9tOiByZW5kZXJXZWF0aGVyRnJvbSxcclxuICAgIHJlbmRlckZvcmVjYXN0RnJvbTogcmVuZGVyRm9yZWNhc3RGcm9tLFxyXG4gICAgZ2V0TmV4dEZpdmVEYXlzRnJvbTogZ2V0TmV4dEZpdmVEYXlzRnJvbVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHB1YmxpY0FQSTtcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyV2VhdGhlckZyb20oY3VycmVudFdlYXRoZXJEYXRhKSB7IC8vIFRPRE8gPT4gbW9kdWxhcml6ZSB0aGlzIGZ1bmN0aW9uXHJcbiAgICBsZXQgdGVtcEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItdG9kYXktZGVncmVlcycpO1xyXG4gICAgbGV0IHdpbmRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXRvZGF5LXN1YnRleHQnKTtcclxuICAgIGxldCBjaXR5RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24tYXJlYSAuY3VycmVudC1jaXR5Jyk7XHJcbiAgICBsZXQgY291bnRyeUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uLWFyZWEgLmN1cnJlbnQtY291bnRyeScpO1xyXG4gICAgbGV0IHRlbXAgPSBNYXRoLnJvdW5kKGN1cnJlbnRXZWF0aGVyRGF0YS5tYWluLnRlbXApO1xyXG4gICAgbGV0IHdpbmQgPSBNYXRoLnJvdW5kKGN1cnJlbnRXZWF0aGVyRGF0YS53aW5kLnNwZWVkKTtcclxuICAgIGxldCBjaXR5ID0gY3VycmVudFdlYXRoZXJEYXRhLm5hbWU7XHJcbiAgICBsZXQgY291bnRyeSA9IGN1cnJlbnRXZWF0aGVyRGF0YS5zeXMuY291bnRyeTtcclxuICAgIGxldCBpc0ZhaHJlbmhlaXQgPSBBcHAuZ2V0RmFocmVuaGVpdCgpO1xyXG4gICAgbGV0IHVuaXQgPSBpc0ZhaHJlbmhlaXQgPyAnbXBoJyA6ICdtcHMnO1xyXG4gICAgd2luZEVsLnRleHRDb250ZW50ID0gYCR7d2luZH0ke3VuaXR9YDtcclxuICAgIHRlbXBFbC50ZXh0Q29udGVudCA9IHRlbXAgKyBIZWxwZXJzLmdldERlZ3JlZXNTeW1ib2woKTtcclxuICAgIGNpdHlFbC50ZXh0Q29udGVudCA9IGAke2NpdHl9LCBgO1xyXG4gICAgY291bnRyeUVsLnRleHRDb250ZW50ID0gY291bnRyeTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckZvcmVjYXN0RnJvbShmb3JlY2FzdERhdGEpIHtcclxuICAgIGxldCBmaXZlRGF5Rm9yZWNhc3REYXRhID0gZ2V0TmV4dEZpdmVEYXlzRnJvbShmb3JlY2FzdERhdGEpO1xyXG4gICAgcmVuZGVyRGF5cyhmaXZlRGF5Rm9yZWNhc3REYXRhKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckRheXMoZml2ZURheUZvcmVjYXN0RGF0YSkge1xyXG4gICAgbGV0IGRheU5hbWVzID0gZ2V0RGF5TmFtZXNGcm9tKGZpdmVEYXlGb3JlY2FzdERhdGEpO1xyXG4gICAgbGV0IGF2Z1RlbXBzID0gZ2V0QXZnVGVtcHNGcm9tKGZpdmVEYXlGb3JlY2FzdERhdGEpO1xyXG4gICAgcmVuZGVyRm9yZWNhc3RlZChkYXlOYW1lcywgJ2RheXMnKTtcclxuICAgIHJlbmRlckZvcmVjYXN0ZWQoYXZnVGVtcHMsICd0ZW1wcycpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0TmV4dEZpdmVEYXlzRnJvbShkYXRhKSB7XHJcbiAgICBsZXQgZm9yZWNhc3REYXRhID1cclxuICAgICAgZGF0YVxyXG4gICAgICAubGlzdFxyXG4gICAgICAuZmlsdGVyKGZvcmVjYXN0ID0+IHtcclxuICAgICAgICByZXR1cm4gaXNUYXJnZXRUaW1lKGZvcmVjYXN0KTtcclxuICAgICAgfSlcclxuXHJcbiAgICBpZiAoZm9yZWNhc3REYXRhLmxlbmd0aCA9PT0gNikge1xyXG4gICAgICBmb3JlY2FzdERhdGEuc2hpZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZm9yZWNhc3REYXRhO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaXNUYXJnZXRUaW1lKGZvcmVjYXN0KSB7XHJcbiAgICAvLyBUT0RPID0+IHRoaW5rIG9mIGEgYmV0dGVyIHdheSB0byBnZXQgcHJvcGVyIGZvcmVjYXN0IGRhdGVzIGFuZCB0aW1lc1xyXG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShmb3JlY2FzdC5kdCAqIDEwMDApO1xyXG4gICAgbGV0IGZvcmVjYXN0SG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgIGxldCBjdXJyZW50SG91ciA9IGdldEN1cnJlbnRIb3VyKCk7XHJcbiAgICBsZXQgY3VycmVudEhvdXJBZGp1c3RlZCA9IGN1cnJlbnRIb3VyICsgMztcclxuXHJcbiAgICBpZiAoY3VycmVudEhvdXJBZGp1c3RlZCA+IDIzKSB7XHJcbiAgICAgIGN1cnJlbnRIb3VyQWRqdXN0ZWQgLT0gMjQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coe2N1cnJlbnRIb3VyQWRqdXN0ZWQsIGZvcmVjYXN0SG91cn0pO1xyXG5cclxuICAgIHJldHVybiBmb3JlY2FzdEhvdXIgPT09IGN1cnJlbnRIb3VyQWRqdXN0ZWQgfHwgZm9yZWNhc3RIb3VyID09PSBjdXJyZW50SG91ckFkanVzdGVkICsgMSB8fCBmb3JlY2FzdEhvdXIgPT09IGN1cnJlbnRIb3VyQWRqdXN0ZWQgKyAyO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0Q3VycmVudEhvdXIoKSB7XHJcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIHJldHVybiBub3cuZ2V0SG91cnMoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldERheU5hbWVzRnJvbShmb3JlY2FzdHMpIHtcclxuICAgIGxldCBkYXlzID0gW107XHJcbiAgICBmb3JlY2FzdHMuZm9yRWFjaChmb3JlY2FzdCA9PiB7XHJcbiAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZm9yZWNhc3QuZHQgKiAxMDAwKTtcclxuICAgICAgbGV0IGRheSA9IERhdGVUaW1lLmdldERheShkYXRlKVxyXG4gICAgICBpZiAoIWRheXMuaW5jbHVkZXMoZGF5KSkge1xyXG4gICAgICAgIGRheXMucHVzaChkYXkpO1xyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIGxldCBmb3JtYXR0ZWREYXlzID0gZm9ybWF0KGRheXMpO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlZERheXM7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmb3JtYXQoZGF5cykge1xyXG4gICAgbGV0IGZvcm1hdHRlZERheXMgPVxyXG4gICAgICBkYXlzXHJcbiAgICAgIC5tYXAoZGF5ID0+IHtcclxuICAgICAgICByZXR1cm4gZGF5LnNsaWNlKDAsIDMpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIH0pXHJcbiAgICByZXR1cm4gZm9ybWF0dGVkRGF5cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckZvcmVjYXN0ZWQoZGF0YSwgdHlwZSkge1xyXG4gICAgbGV0IHRhcmdldENsYXNzID0gZ2V0VGFyZ2V0Q2xhc3NGcm9tRGF0YSh0eXBlKTtcclxuICAgIGxldCB0YXJnZXRFbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldENsYXNzKTtcclxuICAgIHRhcmdldEVscy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgbGV0IG91dHB1dCA9IHR5cGUgPT09ICd0ZW1wcycgPyBkYXRhW2luZGV4XSArIEhlbHBlcnMuZ2V0RGVncmVlc1N5bWJvbCgpIDogZGF0YVtpbmRleF07IC8vIFRPRE9cclxuICAgICAgZWwudGV4dENvbnRlbnQgPSBvdXRwdXQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldFRhcmdldENsYXNzRnJvbURhdGEodHlwZSkge1xyXG4gICAgcmV0dXJuIHR5cGUgPT09ICdkYXlzJyA/ICcuZm9yZWNhc3Qtd2Vla2RheScgOiAnLmZvcmVjYXN0LWRlZ3JlZXMnO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0QXZnVGVtcHNGcm9tKGZvcmVjYXN0cykge1xyXG4gICAgbGV0IGF2Z1RlbXBzID0gZm9yZWNhc3RzXHJcbiAgICAgIC5tYXAoZm9yZWNhc3QgPT4ge1xyXG4gICAgICAgIGxldCBhdmdUZW1wID0gTWF0aC5yb3VuZChmb3JlY2FzdC5tYWluLnRlbXApO1xyXG4gICAgICAgIHJldHVybiBhdmdUZW1wO1xyXG4gICAgICB9KVxyXG4gICAgcmV0dXJuIGF2Z1RlbXBzO1xyXG4gIH1cclxufSgpKTtcclxuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5jb25zdCBJY29ucyA9IChmdW5jdGlvbiByZW5kZXJJY29ucygpIHtcclxuICBjb25zdCBpY29uT2JqID0ge1xyXG4gICAgZGF5OiB7XHJcbiAgICAgICdjbGVhciBza3knOiAnc3VuJyxcclxuICAgICAgJ2ZldyBjbG91ZHMnOiAnc3VuJyxcclxuICAgICAgJ3NjYXR0ZXJlZCBjbG91ZHMnOiAnY2xvdWQnLFxyXG4gICAgICAnYnJva2VuIGNsb3Vkcyc6ICdjbG91ZCcsXHJcbiAgICAgICdzaG93ZXIgcmFpbic6ICdjbG91ZC1yYWluJyxcclxuICAgICAgJ3JhaW4nOiAnY2xvdWQtZHJpenpsZScsXHJcbiAgICAgICd0aHVuZGVyc3Rvcm0nOiAnY2xvdWQtbGlnaHRuaW5nJyxcclxuICAgICAgJ3Nub3cnOiAnY2xvdWQtc25vdycsXHJcbiAgICAgICdtaXN0JzogJ2Nsb3VkLWRyaXp6bGUnXHJcbiAgICB9LFxyXG4gICAgbmlnaHQ6IHtcclxuICAgICAgJ2NsZWFyIHNreSc6ICdtb29uJyxcclxuICAgICAgJ2ZldyBjbG91ZHMnOiAnbW9vbicsXHJcbiAgICAgICdzY2F0dGVyZWQgY2xvdWRzJzogJ2Nsb3VkJyxcclxuICAgICAgJ2Jyb2tlbiBjbG91ZHMnOiAnY2xvdWQnLFxyXG4gICAgICAnc2hvd2VyIHJhaW4nOiAnY2xvdWQtcmFpbicsXHJcbiAgICAgICdyYWluJzogJ2Nsb3VkLWRyaXp6bGUnLFxyXG4gICAgICAndGh1bmRlcnN0b3JtJzogJ2Nsb3VkLWxpZ2h0bmluZycsXHJcbiAgICAgICdzbm93JzogJ2Nsb3VkLXNub3cnLFxyXG4gICAgICAnbWlzdCc6ICdjbG91ZC1kcml6emxlJ1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcHVibGljQVBJID0ge1xyXG4gICAgcmVuZGVyV2VhdGhlckljb25zRnJvbTogcmVuZGVyV2VhdGhlckljb25zRnJvbSxcclxuICAgIHJlbmRlckZvcmVjYXN0SWNvbnNGcm9tOiByZW5kZXJGb3JlY2FzdEljb25zRnJvbVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHB1YmxpY0FQSTtcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyV2VhdGhlckljb25zRnJvbShkYXRhKSB7XHJcbiAgICBsZXQgd2VhdGhlckRlc2NyaXB0aW9uID0gZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xyXG4gICAgbGV0IHRpbWVPZkRheSA9IEhlbHBlcnMuZ2V0VGltZU9mRGF5KCk7XHJcbiAgICBnZXRXZWF0aGVySWNvbnMod2VhdGhlckRlc2NyaXB0aW9uLCB0aW1lT2ZEYXkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0V2VhdGhlckljb25zKHdlYXRoZXJEZXNjcmlwdGlvbiwgdGltZU9mRGF5KSB7XHJcbiAgICBsZXQgaWNvbk5hbWUgPSBnZXRXZWF0aGVySWNvbk5hbWVGcm9tKHdlYXRoZXJEZXNjcmlwdGlvbiwgdGltZU9mRGF5KTtcclxuICAgIGxldCBzdmcgPSBIZWxwZXJzLmdldFN2Z0ZvcihpY29uTmFtZSk7XHJcbiAgICBIZWFkZXIuc2V0SGVhZGVyQXJlYShpY29uTmFtZSk7XHJcbiAgICByZW5kZXJOYXZJY29uKHN2Zyk7XHJcbiAgICByZW5kZXJNYWluSWNvbihzdmcpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0V2VhdGhlckljb25OYW1lRnJvbSh3ZWF0aGVyRGVzY3JpcHRpb24sIHRpbWVPZkRheSkge1xyXG4gICAgcmV0dXJuIGljb25PYmpbdGltZU9mRGF5XVt3ZWF0aGVyRGVzY3JpcHRpb25dID8gaWNvbk9ialt0aW1lT2ZEYXldW3dlYXRoZXJEZXNjcmlwdGlvbl0gOiAnc3VuJztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck5hdkljb24oc3ZnKSB7XHJcbiAgICBjb25zdCBuYXZJY29uRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LXNlY3Rpb24tbWlkLWFyZWEnKTtcclxuICAgIG5hdkljb25FbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgc3ZnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlck1haW5JY29uKHN2Zykge1xyXG4gICAgY29uc3QgbWFpbkljb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXRvZGF5LXN1YnRleHQnKTtcclxuICAgIG1haW5JY29uRWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN2Zyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJGb3JlY2FzdEljb25zRnJvbShmb3JlY2FzdHMpIHtcclxuICAgIGxldCBmaXZlRGF5Rm9yZWNhc3REYXRhID0gRGF0YS5nZXROZXh0Rml2ZURheXNGcm9tKGZvcmVjYXN0cyk7XHJcbiAgICBsZXQgd2VhdGhlckRlc2NyaXB0aW9ucyA9IGdldFdlYXRoZXJEZXNjcmlwdGlvbnNGcm9tKGZpdmVEYXlGb3JlY2FzdERhdGEpO1xyXG4gICAgbGV0IHRhcmdldEVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mb3JlY2FzdC1kZWdyZWVzJyk7XHJcblxyXG4gICAgdGFyZ2V0RWxzLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBsZXQgY3VycmVudFdlYXRoZXJEZXNjID0gd2VhdGhlckRlc2NyaXB0aW9uc1tpbmRleF07XHJcbiAgICAgIGxldCBpY29uTmFtZSA9IGdldEZvcmVjYXN0SWNvbk5hbWVGcm9tKGN1cnJlbnRXZWF0aGVyRGVzYylcclxuICAgICAgLy8gaWNvbk5hbWUgPSAnY2xvdWQtbGlnaHRuaW5nJztcclxuICAgICAgbGV0IHN2ZyA9IEhlbHBlcnMuZ2V0U3ZnRm9yKGljb25OYW1lKTtcclxuICAgICAgZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIHN2Zyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0V2VhdGhlckRlc2NyaXB0aW9uc0Zyb20oZm9yZWNhc3RzKSB7XHJcbiAgICByZXR1cm4gZm9yZWNhc3RzXHJcbiAgICAgICAgICAgICAubWFwKGZvcmVjYXN0ID0+IHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIGZvcmVjYXN0LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRGb3JlY2FzdEljb25OYW1lRnJvbSh3ZWF0aGVyRGVzY3JpcHRpb24pIHtcclxuICAgIHJldHVybiBpY29uT2JqLmRheVt3ZWF0aGVyRGVzY3JpcHRpb25dID8gaWNvbk9iai5kYXlbd2VhdGhlckRlc2NyaXB0aW9uXSA6ICdzdW4nO1xyXG4gIH1cclxuXHJcbn0oKSk7XHJcblxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuY29uc3QgSGVhZGVyID0gKGZ1bmN0aW9uIHJlbmRlckhlYWRlckFyZWEoKSB7XHJcbiAgY29uc3QgcHVibGljQVBJID0ge1xyXG4gICAgc2V0SGVhZGVyQXJlYTogc2V0SGVhZGVyQXJlYVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHB1YmxpY0FQSTtcclxuXHJcbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuXHJcbiAgZnVuY3Rpb24gc2V0SGVhZGVyQXJlYShpY29uTmFtZSkgeyAvLyBUT0RPID0+IGJldHRlciBuYW1lXHJcbiAgICBsZXQgdGltZU9mRGF5ID0gSGVscGVycy5nZXRUaW1lT2ZEYXkoKTtcclxuICAgIGxldCB0eXBlID0gZ2V0VHlwZUZyb20odGltZU9mRGF5LCBpY29uTmFtZSk7IC8vIFRPRE8gPT4gbmFtZVxyXG4gICAgcmVuZGVySGVhZGVyQXJlYUZyb20odHlwZSk7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gZ2V0VHlwZUZyb20odGltZU9mRGF5LCBpY29uTmFtZSkge1xyXG4gICAgbGV0IHR5cGVPYmogPSB7XHJcbiAgICAgICdzdW4nOiAnc3VubnknLFxyXG4gICAgICAnY2xvdWQnOiAnY2xvdWR5JyxcclxuICAgICAgJ2Nsb3VkLXJhaW4nOiAncmFpbnknLFxyXG4gICAgICAnY2xvdWQtZHJpenpsZSc6ICdyYWlueScsXHJcbiAgICAgICdjbG91ZC1saWdodG5pbmcnOiAnY2xvdWR5JyxcclxuICAgICAgJ2Nsb3VkLXNub3cnOiAnY2xvdWR5J1xyXG4gICAgfTtcclxuICAgIGxldCB0eXBlOyAvLyBUT0RPID0+IG5hbWVcclxuXHJcbiAgICBpZiAodGltZU9mRGF5ID09PSAnZGF5Jykge1xyXG4gICAgICB0eXBlID0gdHlwZU9ialtpY29uTmFtZV07XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdHlwZSA9IHRpbWVPZkRheTtcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVySGVhZGVyQXJlYUZyb20oa2V5KSB7XHJcbiAgICByZW5kZXJDb2xvcnNVc2luZyhrZXkpO1xyXG4gICAgcmVuZGVySGVhZGVySWNvbigpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyQ29sb3JzVXNpbmcoa2V5KSB7XHJcbiAgICBsZXQgY2FyZENvbG9yc09iaiA9IHtcclxuICAgICAgbmlnaHQ6IHtcclxuICAgICAgICBwcmltYXJ5Q29sb3I6ICcjZmZmJyxcclxuICAgICAgICBzZWNvbmRhcnlDb2xvcjogJyMyYzNlNTAnXHJcbiAgICAgIH0sXHJcbiAgICAgIHN1bm55OiB7XHJcbiAgICAgICAgcHJpbWFyeUNvbG9yOiAnIzJjM2U1MCcsXHJcbiAgICAgICAgc2Vjb25kYXJ5Q29sb3I6ICcjZmNmM2QyJ1xyXG4gICAgICB9LFxyXG4gICAgICBjbG91ZHk6IHtcclxuICAgICAgICBwcmltYXJ5Q29sb3I6ICcjMmMzZTUwJyxcclxuICAgICAgICBzZWNvbmRhcnlDb2xvcjogJyNlY2YwZjEnXHJcbiAgICAgIH0sXHJcbiAgICAgIHJhaW55OiB7XHJcbiAgICAgICAgcHJpbWFyeUNvbG9yOiAnI2ZmZicsXHJcbiAgICAgICAgc2Vjb25kYXJ5Q29sb3I6ICcjMzQ5OGRiJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tc2Vjb25kYXJ5Q29sb3InLCBjYXJkQ29sb3JzT2JqW2tleV0uc2Vjb25kYXJ5Q29sb3IpO1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXByaW1hcnlDb2xvcicsIGNhcmRDb2xvcnNPYmpba2V5XS5wcmltYXJ5Q29sb3IpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVySGVhZGVySWNvbigpIHtcclxuICAgIGxldCBoZWFkZXJJY29uU3ZnID0gSGVscGVycy5nZXRTdmdGb3IoJ2Nsb2NrJyk7XHJcbiAgICBsZXQgaGVhZGVySWNvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvY2F0aW9uLWFuZC10aW1lLWFyZWEgLnRpbWUtaWNvbicpO1xyXG4gICAgaGVhZGVySWNvbkVsLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGhlYWRlckljb25TdmcpO1xyXG4gIH1cclxufSgpKTtcclxuXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqXHJcblxyXG5jb25zdCBEYXRlVGltZSA9IChmdW5jdGlvbiBzZXR1cERhdGVUaW1lKCkge1xyXG4gIGNvbnN0IHB1YmxpY0FQSSA9IHtcclxuICAgIHJlbmRlckRhdGVUaW1lOiByZW5kZXJEYXRlVGltZSxcclxuICAgIGdldERheTogZ2V0RGF5XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHVibGljQVBJO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJEYXRlVGltZSgpIHsgLy8gVE9ET1xyXG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBzZXREYXRlKG5vdyk7XHJcbiAgICBzZXREYXkobm93KTtcclxuICAgIHNldFRpbWUobm93KTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBzZXREYXRlKG5vdykge1xyXG4gICAgbGV0IGRhdGUgPSBnZXREYXRlKG5vdyk7XHJcbiAgICByZW5kZXJEYXRlKGRhdGUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc2V0RGF5KG5vdykge1xyXG4gICAgbGV0IGRheSA9IGdldERheShub3cpO1xyXG4gICAgcmVuZGVyRGF5KGRheSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRUaW1lKG5vdykge1xyXG4gICAgbGV0IHRpbWUgPSBnZXRUaW1lKG5vdyk7XHJcbiAgICByZW5kZXJUaW1lKHRpbWUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0RGF0ZShub3cpIHtcclxuICAgIGxldCBkYXRlID0gbm93LmdldERhdGUoKTtcclxuICAgIHJldHVybiBhZGRTdWZmaXhUbyhkYXRlKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdldERheShub3cpIHtcclxuICAgIGxldCBkYXlzID0gWydTdW5kYXknLCdNb25kYXknLCdUdWVzZGF5JywnV2VkbmVzZGF5JywnVGh1cnNkYXknLCdGcmlkYXknLCdTYXR1cmRheSddO1xyXG4gICAgbGV0IGRheU51bSA9IG5vdy5nZXREYXkoKTtcclxuICAgIGxldCBkYXlOYW1lID0gZGF5c1tkYXlOdW1dO1xyXG4gICAgcmV0dXJuIGRheU5hbWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBnZXRUaW1lKG5vdykge1xyXG4gICAgbGV0IHRpbWUgPVxyXG4gICAgICBub3dcclxuICAgICAgICAudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7aG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0J30pXHJcbiAgICAgICAgLnRvTG93ZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gdGltZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFkZFN1ZmZpeFRvKGRhdGUpIHtcclxuICAgIGxldCBzdWZmaXggPSBnZXRTdWZmaXhPZihkYXRlKTtcclxuICAgIHJldHVybiBkYXRlICsgc3VmZml4O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZ2V0U3VmZml4T2YoZGF0ZSkge1xyXG4gICAgbGV0IHN1ZmZpeDtcclxuICAgIGxldCByZW1haW5kZXIgPSBkYXRlICUgMTA7XHJcblxyXG4gICAgaWYgKHJlbWFpbmRlciA9PT0gMSAmJiBkYXRlICE9PSAxMSkge1xyXG4gICAgICBzdWZmaXggPSAnc3QnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAocmVtYWluZGVyID09PSAyICYmIGRhdGUgIT09IDEyKSB7XHJcbiAgICAgIHN1ZmZpeCA9ICduZCc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChyZW1haW5kZXIgPT09IDMgJiYgZGF0ZSAhPT0gMTMpIHtcclxuICAgICAgc3VmZml4ID0gJ3JkJztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBzdWZmaXggPSAndGgnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdWZmaXg7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJEYXRlKGRhdGUpIHtcclxuICAgIGxldCBkYXRlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci10b2RheS1hcmVhIC53ZWF0aGVyLXRvZGF5LWRhdGUnKVxyXG4gICAgZGF0ZUVsLnRleHRDb250ZW50ID0gZGF0ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckRheShkYXkpIHtcclxuICAgIGxldCBkYXlFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWF0aGVyLXRvZGF5LWFyZWEgLndlYXRoZXItdG9kYXktd2Vla2RheScpXHJcbiAgICBkYXlFbC50ZXh0Q29udGVudCA9IGRheTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlclRpbWUodGltZSkge1xyXG4gICAgbGV0IHRpbWVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1hbmQtdGltZS1hcmVhIC50aW1lLXRleHQnKTtcclxuICAgIHRpbWVFbC50ZXh0Q29udGVudCA9IHRpbWU7XHJcbiAgfVxyXG5cclxufSgpKTtcclxuXHJcbkFwcC5pbml0KCk7XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRBbmltYXRpb25zKCkge1xyXG5cclxuICBjb25zdCBwdWJsaWNBUEkgPSB7XHJcbiAgICBydW5BdFN0YXJ0OiBydW5BdFN0YXJ0LFxyXG4gICAgcnVuQXRUb2dnbGU6IHJ1bkF0VG9nZ2xlXHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHVibGljQVBJO1xyXG5cclxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5cclxuICBmdW5jdGlvbiBydW5BdFN0YXJ0KCkge1xyXG4gICAgY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY3VycmVudFdlYXRoZXJBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNlbnRlci1leHBlcmltZW50Jyk7XHJcbiAgICBjb25zdCBmb3JlY2FzdEFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9yZWNhc3QtYXJlYScpO1xyXG4gICAgbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlLWNvbnRhaW5lcicpO1xyXG4gICAgbWFpbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzaG93LWNvbnRhaW5lcicpO1xyXG4gICAgY3VycmVudFdlYXRoZXJBcmVhLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJywgJ2ZhZGVJbkxlZnQnKTtcclxuICAgIGZvcmVjYXN0QXJlYS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnLCAnZmFkZUluJyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcnVuQXRUb2dnbGUoKSB7XHJcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlckRlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci10b2RheS1kZWdyZWVzJyk7XHJcbiAgICBjb25zdCBjdXJyZW50V2VhdGhlcldpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci10b2RheS1zdWJ0ZXh0Jyk7XHJcbiAgICBjb25zdCBmb3JlY2FzdERlZ3JlZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9yZWNhc3QtZGVncmVlcycpO1xyXG4gICAgY3VycmVudFdlYXRoZXJEZWdyZWVzLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJywgJ2ZhZGVJbicpO1xyXG4gICAgY3VycmVudFdlYXRoZXJEZWdyZWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcclxuICAgICAgY3VycmVudFdlYXRoZXJEZWdyZWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGVJbicpO1xyXG4gICAgfSk7XHJcbiAgICBjdXJyZW50V2VhdGhlcldpbmQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnLCAnZmFkZUluJyk7XHJcbiAgICBjdXJyZW50V2VhdGhlcldpbmQuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgKCkgPT4ge1xyXG4gICAgICBjdXJyZW50V2VhdGhlcldpbmQuY2xhc3NMaXN0LnJlbW92ZSgnZmFkZUluJyk7XHJcbiAgICB9KTtcclxuICAgIGZvcmVjYXN0RGVncmVlcy5mb3JFYWNoKGZvcmVjYXN0ID0+IHtcclxuICAgICAgZm9yZWNhc3QuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnLCAnZmFkZUluJyk7XHJcbiAgICAgIGZvcmVjYXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcclxuICAgICAgICBmb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlSW4nKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbiIsImV4cG9ydCBjb25zdCBIZWxwZXJzID0ge1xyXG4gIHdlYXRoZXJVUkw6IHtcclxuICAgIGZhaHJlbmhlaXQ6ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj91bml0cz1pbXBlcmlhbCZtb2RlPWpzb24mYXBwaWQ9ZTc4MTlhMDY0NWJiMzcyM2ZiZmUyMjNhZDA3NGM4NzAnLFxyXG4gICAgY2Vsc2l1czogJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3VuaXRzPW1ldHJpYyZtb2RlPWpzb24mYXBwaWQ9ZTc4MTlhMDY0NWJiMzcyM2ZiZmUyMjNhZDA3NGM4NzAnXHJcbiAgfSxcclxuICBmb3JlY2FzdFVSTDoge1xyXG4gICAgZmFocmVuaGVpdDogJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD91bml0cz1pbXBlcmlhbCZtb2RlPWpzb24mYXBwaWQ9ZTc4MTlhMDY0NWJiMzcyM2ZiZmUyMjNhZDA3NGM4NzAnLFxyXG4gICAgY2Vsc2l1czogJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD91bml0cz1tZXRyaWMmbW9kZT1qc29uJmFwcGlkPWU3ODE5YTA2NDViYjM3MjNmYmZlMjIzYWQwNzRjODcwJ1xyXG4gIH0sXHJcblxyXG4gIGdldERlZ3JlZXNTeW1ib2woKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgxNzYpO1xyXG4gIH0sXHJcblxyXG4gIGdldFRpbWVPZkRheSgpIHtcclxuICAgIGxldCBob3VyID0gdGhpcy5nZXRIb3VyKCk7XHJcbiAgICByZXR1cm4gaG91ciA+IDcgJiYgaG91ciA8IDE5ID8gJ2RheScgOiAnbmlnaHQnO1xyXG4gIH0sXHJcblxyXG4gIGdldEhvdXIoKSB7XHJcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIHJldHVybiBub3cuZ2V0SG91cnMoKTtcclxuICB9LFxyXG5cclxuICBnZXRTdmdGb3IoaWNvbk5hbWUpIHtcclxuICAgIHJldHVybiBmZWF0aGVyLmljb25zW2ljb25OYW1lXS50b1N2ZygpO1xyXG4gIH1cclxufTtcclxuIl19
