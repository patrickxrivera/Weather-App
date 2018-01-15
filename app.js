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
// get current

// API key => e7819a0645bb3723fbfe223ad074c870

// console.log(currentWeatherUrl);
function success(position) {
  let coords = position.coords;
  let latitude = coors.latitude;
  let longitude = coors.longitude;
  let forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  let currentWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  forecastUrl = `${forecastUrl}&lat=${latitude}&lon=${longitude}`;
  currentWeatherUrl = `${currentWeatherUrl}&lat=${latitude}&lon=${longitude}`;
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

(function() {
  navigator.geolocation.getCurrentPosition(success, error);
}());
