import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/App.css';

import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

const API_Key = '370ddf7f98161d511fa6ed6be348ec9d';

class App extends Component {
  state = {
    city: undefined,
    temperature: undefined,
    description: undefined,
    icon: undefined,
    units: 'metric',
    degree: '°C',
    error: undefined
  }

  getWeather = async (e) => {
    let units = this.state.units;
    const city = this.state.city;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_Key}&units=${units}`);
    const data = await api_call.json();

    if (city) {
      console.log(data);
      // this.buildForecast(data.list);
      this.setState({
        city: data.city.name,
        temperature: data.list[0].main.temp,
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
        error: undefined
      });
    } else {
      this.setState({
        city: undefined,
        temperature: undefined,
        description: undefined,
        icon: undefined,
        error: 'Please enter the city'
      });
    }
  }

  updateCity(e) {
    e.preventDefault();
    const city = e.target.elements.city.value;

    this.setState({
      city
    }, this.getWeather);
  }

  changeUnits(e) {
    const checkbox = e.target.checked;

    if (checkbox) {
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

  timeStampToDay (dt_txt) {
    return new Date(dt_txt).getDay();
  }

  buildForecast(data) {
    // const day = new Date().getDay();
    // const forecast = [];
    // const daylist = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    for (let d of data) {
      let futureDay = this.timeStampToDay(d.dt_txt);
      console.log(futureDay);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path='/' render={(props) => <Form {...props}
              updateCity={this.updateCity.bind(this)}
              getWeather={this.getWeather.bind(this)}
              error={this.state.error}
            />} exact />
            <Route path='/weather' render={(props) => <Weather {...props}
              changeUnits={this.changeUnits.bind(this)}
              city={this.state.city}
              temperature={this.state.temperature}
              degree={this.state.degree}
              description={this.state.description}
              icon={this.state.icon}
            />} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
