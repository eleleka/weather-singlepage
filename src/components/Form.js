import React, {Component} from 'react';
import { ReactComponent as Compass} from '../icons/wi-wind-deg.svg';
import { ReactComponent as Search} from '../icons/search.svg';

class Form extends Component {
  state = {
    error: undefined
  }

  submitForm(e) {
    const query = e.target.elements.city.value;
    const { history } = this.props;
    const vm = this;

    e.preventDefault();

    vm.props.updateCity(query)
    .then(function() {
      if (vm.props.error !== '404' && vm.props.error !== '400') {
        history.push('/weather');
      }
    })
    .catch(function(error) {
      console.log(error);
      history.push('/');
      vm.setState({
        error
      })
    });
  }

  handleGeoRequest(e) {
    const lat = e.coords.latitude;
    const lon = e.coords.longitude;
    const { history } = this.props;
    const vm = this;

    vm.props.coordUp(lat, lon)
    .then(function() {
      if (vm.props.error !== '404' && vm.props.error !== '400') {
        history.push('/weather');
      }
    })
    .catch(function(error) {
      console.log(error);
      history.push('/');
      vm.setState({
        error
      })
    });
  }

  requestGeo() {
    navigator.geolocation.getCurrentPosition(this.handleGeoRequest.bind(this));
    this.setState({
      loading: true
    });
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <div className="home-wrapper">
        <form className="search-form" onSubmit={ this.submitForm.bind(this) }>
          <input type="text" className={ "input-name-city " + (this.state.error ? 'input-error' : '') } name="city" placeholder="City" />
          <button className="form-submit"><Search className="icon-svg search" /></button>
          { this.state.error && <p className="error">{ this.state.error }</p> }
        </form>
        <div className="current-position">
          or <br/> use my <span type="button" tabIndex="0" onClick={ this.requestGeo.bind(this) }>current position</span>
          { this.state.loading && <p className="loading">Loading <Compass className="icon-svg" /></p> }
        </div>
      </div>
    );
  }
}

export default Form;
