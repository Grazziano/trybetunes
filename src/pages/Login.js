import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
      username: '',
      loading: false,
      redirect: false,
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
          username: value,
        },
      );
    } else {
      this.setState(
        {
          buttonIsDisabled: true,
          username: value,
        },
      );
    }
  }

  async onSubmit() {
    const { username } = this.state;
    this.setState({ loading: true });
    await createUser({ name: username });
    this.setState(
      {
        loading: false,
        redirect: true,
      },
    );
  }

  render() {
    const { buttonIsDisabled, loading, redirect } = this.state;

    if (loading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <label htmlFor="name-input">
          User
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
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
