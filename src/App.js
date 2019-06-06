import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/App.scss';
import './css/weather-icons.min.css';

import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';
import moment from 'moment';

class App extends Component {
  state = {
    city: localStorage.getItem('city') || undefined,
    lat: undefined,
    lon: undefined,
    temperature: undefined,
    description: undefined,
    icon: undefined,
    dayTime: undefined,
    units: 'metric',
    degree: '°C',
    days: [],
    hours: [],
    error: undefined
  }

  buildQuery(data) {
    if(typeof data === 'string') {
      return data;
    }

    const query = [];

    for(let key in data) {
      if(data.hasOwnProperty(key) && typeof data[key] !== 'undefined') {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
    }

    return query.join('&');
  }

  getWeather = async(e) => {
    const endpoint = 'https://api.openweathermap.org/data/2.5/forecast';
    const query = this.buildQuery({
      q: this.state.city,
      lat: this.state.lat,
      lon: this.state.lon,
      APPID: '370ddf7f98161d511fa6ed6be348ec9d',
      units: this.state.units
    });
    const api_url = endpoint + '?' + query;
    const api_call = await fetch(api_url);
    const data = await api_call.json();

    if(data.cod !== '400' && data.cod !== '404') {
      const list = data.list.map(this.processData.bind(this));
      const days = this.getDays(list);
      const hours = this.getHours(list);
    }

    if (data.cod !== '400' && data.cod !== '404') {
      this.setState({
        city: data.city.name,
        temperature: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        dayTime: data.list[0].hour > 3 && data.list[0].hour < 21 ? 'day' : 'night',
        icon: data.list[0].weather[0].id,
        error: undefined
      });
    } else {
      this.setState({
        city: undefined,
        temperature: undefined,
        description: undefined,
        dayTime: undefined,
        icon: undefined,
        error: data.cod
      });
      throw(data.message);
    }
  }

  componentDidMount() {
    if (this.state.city) {
      this.getWeather();
    }
  }

  updateCity(cityName) {
    const city = cityName;
    const vm = this;

    return new Promise (function(resolve, reject) {
      vm.setState({
        city
      }, function() {
        vm.getWeather()
        .then(cityName => {
          resolve(cityName);
          localStorage.setItem('city', city);
        })
        .catch(cityName => {
          reject(cityName);
        });
      });
    });
  }

  coordUp(latitude, longitude) {
    const lat = latitude;
    const lon = longitude;
    const vm = this;

    return new Promise (function(resolve, reject) {
      vm.setState({
        city: undefined,
        lat,
        lon
      }, function() {
        vm.getWeather()
        .then((latitude, longitude) => {
          resolve(latitude, longitude);
          localStorage.setItem('city', vm.state.city);
        })
        .catch((latitude, longitude) => {
          reject(latitude, longitude);
        });
      });
    });
  }

  changeUnits(e) {
    const checkbox = e.target.checked;

    if(checkbox) {
      this.setState({
        units: 'imperial',
        degree: '°F'
      }, this.getWeather);
    } else {
      this.setState({
        units: 'metric',
        degree: '°C'
      }, this.getWeather);
    }
  }

  forecastTime(s) {
    const time = s;
    if (time === 0 || time === 3) return 'Night'
    else if (time === 6 || time === 9) return "Morning"
    else if (time === 12 || time === 15) return "Day"
    else return "Evening"
  }

  processData(item) {
    const date = moment(item.dt_txt);
    item.hour = date.format('H');
    item.day = date.format('DD');
    item.weekDay = date.format('dddd');
    item.day_time = this.forecastTime(parseInt(item.hour));
    return item;
  }

  getDays(list) {
    const days = [];
    let prevDay = null;

    for (let i of list) {
      if (prevDay !== i.day) {
        prevDay = i.day;
        days.push({
          key: i.dt,
          temps: []
        });
      }
      i.key = i.dt;

      days[days.length - 1].temps.push(i);
    }

    const daysTemp = days.map(function(day) {
      let tempsLength = day.temps.length + 1;
      let offSet = Math.ceil(tempsLength / 2);
      return day.temps[offSet - 1];
    });

    daysTemp.shift();

    this.setState({
      days: daysTemp
    });
  }

  getHours(list) {
    const hours = list.slice(1, 8);

    let filterHours = hours.filter(function(element, index, array) {
      return (index % 2 === 0);
    });

    this.setState({
      hours: filterHours
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path='/' render={ (props) => <Form { ...props }
              updateCity={ this.updateCity.bind(this) }
              coordUp={ this.coordUp.bind(this) }
              getWeather={ this.getWeather.bind(this) }
              error={ this.state.error }
            /> } exact />
            <Route path='/weather' render={ (props) => <Weather { ...props }
              changeUnits={ this.changeUnits.bind(this) }
              city={ this.state.city }
              temperature={ this.state.temperature }
              degree={ this.state.degree }
              description={ this.state.description }
              dayTime={ this.state.dayTime }
              icon={ this.state.icon }
              days={ this.state.days }
              hours={ this.state.hours }
            /> } />
            <Route path ='/error' render={ (props) => <Error { ...props }
              error={ this.state.error }
            /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
