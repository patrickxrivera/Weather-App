define(async function() {

  const App = require('./main.js');

  return async function getAPI(position, url) { // TODO => improve Module name
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
});
