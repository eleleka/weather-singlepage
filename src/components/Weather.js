import React, { Component } from 'react';
import moment from 'moment';
import Navigation from './Navigation';

class Weather extends Component {
  render() {
    return (
      <div className="weather-pane">
        <div className="header-left">
          <Navigation />
          { this.props.city && <span className="city-name">{ this.props.city }</span>}
        </div>
        <div className="unit-switcher">
          <input type="checkbox" id="switcher" name="units" onChange={ this.props.changeUnits } />
          <label htmlFor="switcher">°C</label>
        </div>
        <div className="current-date">{ moment().format('dddd, MMMM Do YYYY') }</div>
        { this.props.description && <p className="weather-description">{ this.props.description }</p>}
        { this.props.temperature && this.props.degree && <p className="temperature">{ Number((this.props.temperature).toFixed(0)) }{ this.props.degree }</p>}
        { this.props.icon && <div className={ `weather-icon icon-${this.props.icon}` }></div>}
      </div>
    );
  }
}

export default Weather;
