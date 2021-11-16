import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const minSize = 2;
    const valueLength = target.value.length;

    if (valueLength >= minSize) {
      this.setState({ buttonIsDisabled: false });
    } else {
      this.setState({ buttonIsDisabled: true });
    }
  }

  render() {
    const { buttonIsDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Nome do Arttista"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonIsDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
