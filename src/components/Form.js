import React, {Component} from 'react';

class Form extends Component {
  submitForm(e) {
    this.props.updateCity(e);
    const query = e.target.elements.city.value;
    const { history } = this.props;

    if (query !== '') {
      history.push('/weather');
    }
  }

  render() {
    return (
      <div className="home-wrapper">
        <form className="search-form" onSubmit={this.submitForm.bind(this)}>
          <input type="text" className="input-name-city" name="city" placeholder="City" />
          <button className="form-submit">Search</button>
          { this.props.error && <p className="error">{ this.props.error }</p>}
        </form>
      </div>
    );
  }
}

export default Form;
