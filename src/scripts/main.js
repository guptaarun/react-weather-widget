"use strict";
// Include scss
require('../scss/main.scss');
// main.js
import React from 'react'
import ReactDOM from 'react-dom'
import APIHelper from "./APIHelper.js";

var WeatherWidget = React.createClass({
  getInitialState: function() {
    return {loading: true};
  },
  componentDidMount: function() {
    APIHelper.fetchWeather().then((data) => {
      var weather = data.query.results.channel.item;
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
