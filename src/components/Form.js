import React, {Component} from 'react';

class Form extends Component {
  submitForm(e) {
    const { history } = this.props;
    history.push('/weather');
    this.props.updateCity(e);
  }

  render() {
    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input type="text" name="city" placeholder="City" />
        <button>Search</button>
      </form>
    );
  }
}

export default Form;
