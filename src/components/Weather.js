import React, { Component } from 'react';
import moment from 'moment';

class Weather extends Component {
  render() {
    return (
      <div className="weather-pane">
        <input type="checkbox" name="units" onChange={ this.props.changeUnits } />
        <div>{ moment().format('dddd, MMMM Do YYYY') }</div>
        { this.props.city && <p>{ this.props.city }</p>}
        { this.props.temperature && this.props.degree && <p>{ this.props.temperature } { this.props.degree }</p>}
        { this.props.description && <p>{ this.props.description }</p>}
        { this.props.icon && <p>{ this.props.icon }</p>}
        { this.props.error && <p>{ this.props.error }</p>}
      </div>
    );
  }
}

export default Weather;
