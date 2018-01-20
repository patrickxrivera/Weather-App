export const Helpers = {
  weatherURL: {
    fahrenheit: 'https://api.openweathermap.org/data/2.5/weather?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',
    celsius: 'https://api.openweathermap.org/data/2.5/weather?units=metric&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  },
  forecastURL: {
    fahrenheit: 'https://api.openweathermap.org/data/2.5/forecast?units=imperial&mode=json&appid=e7819a0645bb3723fbfe223ad074c870',
    celsius: 'https://api.openweathermap.org/data/2.5/forecast?units=metric&mode=json&appid=e7819a0645bb3723fbfe223ad074c870'
  },

  getDegreesSymbol() {
    return String.fromCharCode(176);
  },

  getTimeOfDay() {
    let hour = this.getHour();
    return hour > 7 && hour < 19 ? 'day' : 'night';
  },

  getHour() {
    let now = new Date();
    return now.getHours();
  },

  getSvgFor(iconName) {
    return feather.icons[iconName].toSvg();
  }
};
