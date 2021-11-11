import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
      userName: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange({ target }) {
    const minSize = 3;
    const valueLength = target.value.length;
    const { value } = target;

    if (valueLength >= minSize) {
      this.setState(
        {
          buttonIsDisabled: false,
          userName: value,
        },
      );
    } else {
      this.setState(
        {
          buttonIsDisabled: true,
          userName: value,
        },
      );
    }
  }

  onSubmit() {
    const { userName } = this.state;
    createUser({ name: userName });
  }

  render() {
    const { buttonIsDisabled } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          onClick={ this.onSubmit }
          disabled={ buttonIsDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}
