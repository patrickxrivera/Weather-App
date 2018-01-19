define(function() {

  const publicAPI = {
    runAtStart: runAtStart,
    runAtToggle: runAtToggle
  }

  return publicAPI;

  // **************************

  function runAtStart() {
    const mainContainer = document.querySelector('.main-container');
    const currentWeatherArea = document.querySelector('.center-experiment');
    const forecastArea = document.querySelectorAll('.forecast-area');
    mainContainer.classList.remove('hide-container');
    mainContainer.classList.add('show-container');
    currentWeatherArea.classList.add('animated', 'fadeInLeft');
    forecastArea.forEach(el => {
      el.classList.add('animated', 'fadeIn');
    })
  }

  function runAtToggle() {
    const currentWeatherDegrees = document.querySelector('.weather-today-degrees');
    const currentWeatherWind = document.querySelector('.weather-today-subtext');
    const forecastDegrees = document.querySelectorAll('.forecast-degrees');
    currentWeatherDegrees.classList.add('animated', 'fadeIn');
    currentWeatherDegrees.addEventListener('animationend', () => {
      currentWeatherDegrees.classList.remove('fadeIn');
    });
    currentWeatherWind.classList.add('animated', 'fadeIn');
    currentWeatherWind.addEventListener('animationend', () => {
      currentWeatherWind.classList.remove('fadeIn');
    });
    forecastDegrees.forEach(forecast => {
      forecast.classList.add('animated', 'fadeIn');
      forecast.addEventListener('animationend', () => {
        forecast.classList.remove('fadeIn');
      });
    });
  }

});
