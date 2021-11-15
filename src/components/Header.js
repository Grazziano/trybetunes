import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then(({ name }) => this.setState({ name, loading: false }));
  }

  render() {
    const { name, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <span data-testid="header-user-name">{name}</span>
      </header>
    );
  }
}
