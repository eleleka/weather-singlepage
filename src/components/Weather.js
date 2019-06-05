import React, { Component } from 'react';
import moment from 'moment';
import Navigation from './Navigation';

class Weather extends Component {
  render() {
    // const vm = this;
    return (
      <div className="weather-pane">
        <div className="header-left">
          <Navigation />
          { this.props.city && <span className="city-name">{ this.props.city }</span> }
        </div>
        <div className="unit-switcher">
          <input type="checkbox" id="switcher" name="units" onChange={ this.props.changeUnits } />
          <label htmlFor="switcher">°C</label>
        </div>
        <div className="current-date">{ moment().format('dddd, MMMM Do YYYY') }</div>
        { this.props.description && <p className="weather-description">{ this.props.description }</p> }

        <div className="weather-data">
          { this.props.temperature && this.props.degree && <div className="temperature">{ Number((this.props.temperature).toFixed(0)) }{ this.props.degree }</div> }
          { this.props.icon && <div className="current-weather-icon"><i className={ `wi wi-owm-${ this.props.dayTime }-${ this.props.icon }` }></i></div> }

          <ul className="day-forecast">
            { this.props.hours.map(function(hour) {
                return <li className="forecast-hour" key={ hour.key }>
                        <span>{ hour.day_time }</span>
                        { Number((hour.main.temp).toFixed(0)) }
                        { this.props.degree }
                      </li>
              }.bind(this))
            }
          </ul>
        </div>

        <ul className="week-forecast">
          { this.props.days.map(function(item) {
              return <li className="forecast-item" key={ item.key }>
                    <div className="forcast-day">
                      { item.weekDay }
                    </div>
                    <div className="forecast-icon">
                      <i className={ `wi wi-owm-${ item.weather[0].id }` }></i>
                    </div>
                    <div className="forecast-temp">
                      { Number((item.main.temp).toFixed(0)) }
                      { this.props.degree }
                    </div>
                  </li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
}

export default Weather;
