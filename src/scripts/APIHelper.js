// APIHelper.js
var helpers = {
  fetchWeather: function(category) {
    // API Url
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithke';
    return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //console.log('parsed json', json);
      return json
    })
    .catch(function(error) {
      console.log('error', error);
    })
  }
};

module.exports = helpers;
