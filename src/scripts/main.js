"use strict";
// Include scss
require('../scss/main.scss');
// main.js
import React from 'react'
import ReactDOM from 'react-dom'
import Fetch from 'react-fetch'

import APIHelper from "./APIHelper.js";

var WeatherWidget = React.createClass({
  getInitialState: function() {
    return {loading: true};
  },
  componentDidMount: function() {
    APIHelper.fetchWeather().then((data) => {
      // Test json mock data
      var jsondata = { "query": { "count": 1, "created": "2017-01-07T19:33:43Z", "lang": "en-US", "results": { "channel": { "units": { "distance": "mi", "pressure": "in", "speed": "mph", "temperature": "F" }, "title": "Yahoo! Weather - Fairfax, VA, US", "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12590343/", "description": "Yahoo! Weather for Fairfax, VA, US", "language": "en-us", "lastBuildDate": "Sat, 07 Jan 2017 02:33 PM EST", "ttl": "60", "location": { "city": "Fairfax", "country": "United States", "region": " VA" }, "wind": { "chill": "9", "direction": "340", "speed": "18" }, "atmosphere": { "humidity": "84", "pressure": "1011.0", "rising": "0", "visibility": "16.1" }, "astronomy": { "sunrise": "7:28 am", "sunset": "5:3 pm" }, "image": { "title": "Yahoo! Weather", "width": "142", "height": "18", "link": "http://weather.yahoo.com", "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif" }, "item": { "title": "Conditions for Fairfax, VA, US at 01:00 PM EST", "lat": "38.831539", "long": "-77.288612", "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12590343/", "pubDate": "Sat, 07 Jan 2017 01:00 PM EST", "condition": { "code": "16", "date": "Sat, 07 Jan 2017 01:00 PM EST", "temp": "20", "text": "Snow" }, "forecast": [ { "code": "14", "date": "07 Jan 2017", "day": "Sat", "high": "26", "low": "20", "text": "Snow Showers" }, { "code": "32", "date": "08 Jan 2017", "day": "Sun", "high": "25", "low": "16", "text": "Sunny" }, { "code": "30", "date": "09 Jan 2017", "day": "Mon", "high": "30", "low": "14", "text": "Partly Cloudy" }, { "code": "39", "date": "10 Jan 2017", "day": "Tue", "high": "42", "low": "22", "text": "Scattered Showers" }, { "code": "39", "date": "11 Jan 2017", "day": "Wed", "high": "54", "low": "38", "text": "Scattered Showers" }, { "code": "28", "date": "12 Jan 2017", "day": "Thu", "high": "49", "low": "36", "text": "Mostly Cloudy" }, { "code": "28", "date": "13 Jan 2017", "day": "Fri", "high": "59", "low": "43", "text": "Mostly Cloudy" }, { "code": "28", "date": "14 Jan 2017", "day": "Sat", "high": "53", "low": "44", "text": "Mostly Cloudy" }, { "code": "28", "date": "15 Jan 2017", "day": "Sun", "high": "54", "low": "44", "text": "Mostly Cloudy" }, { "code": "28", "date": "16 Jan 2017", "day": "Mon", "high": "48", "low": "40", "text": "Mostly Cloudy" } ], "description": "<![CDATA[<img src=\"http://l.yimg.com/a/i/us/we/52/16.gif\"/>\n<BR />\n<b>Current Conditions:</b>\n<BR />Snow\n<BR />\n<BR />\n<b>Forecast:</b>\n<BR /> Sat - Snow Showers. High: 26Low: 20\n<BR /> Sun - Sunny. High: 25Low: 16\n<BR /> Mon - Partly Cloudy. High: 30Low: 14\n<BR /> Tue - Scattered Showers. High: 42Low: 22\n<BR /> Wed - Scattered Showers. High: 54Low: 38\n<BR />\n<BR />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-12590343/\">Full Forecast at Yahoo! Weather</a>\n<BR />\n<BR />\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)\n<BR />\n]]>", "guid": { "isPermaLink": "false" } } } } } };
      var weather = jsondata.query.results.channel.item;
      // To use API data use
      //var weather = data.query.results.channel.item;
      this.setState({loading: false, data: weather});
    });
  },
  render: function() {
    if (this.state.loading) {
      return <div>Please wait...</div>;
    }
    return (
      <div>
        <City data={this.state.data} />
        <Temperature data={this.state.data} />
        <WeatherInfo data={this.state.data} />
        <WeatherForecast data={this.state.data} />
      </div>
    )
  }
});

var City = React.createClass({
  getInitialState: function() {
    return {title: ''};
  },
  componentDidMount: function(){
    var title = this.props.data.title.split(" ");
    this.setState({title: title.splice(2,1) + " " + title.splice(2,1)[0].replace(/,/g, ' ')});
  },
  render: function(){
    return(
      <h1 className="_city">{this.state.title}</h1>
    );
  }
});

var Temperature = React.createClass({
  render: function(){
    return(
      <div className="_temprature">{this.props.data.condition.temp}&deg;</div>
    );
  }
});

var WeatherInfo = React.createClass({
  render: function(){
    return (
      <div className="_weatherinfo">
        <img src={'http://l.yimg.com/a/i/us/we/52/' + this.props.data.condition.code + '.gif'} alt={this.props.data.condition.text} />
        <div>{this.props.data.condition.text}</div>
      </div>
    );
  }
});

var WeatherForecast = React.createClass({
  render: function(){
    var days = this.props.data.forecast;
    days = days.slice(0, 5);
    return (
      <ul className="_weatherforecast">
        {days.map(function(day, i) {
          return <li key={'r' + i}><div>{day.day}</div>{day.high}&deg; / {day.low}&deg;</li>;
        })}
      </ul>
    );
  }
});

ReactDOM.render(
  <WeatherWidget/>,
  document.getElementById('widget01__weather')
);
