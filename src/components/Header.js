import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <h1 data-testid="header-user-name">{name}</h1>
        <nav>
          <p><Link data-testid="link-to-search" to="/search">Search</Link></p>
          <p><Link data-testid="link-to-favorites" to="/favorites">Favorites</Link></p>
          <p><Link data-testid="link-to-profile" to="/profile">Profile</Link></p>
        </nav>
      </header>
    );
  }
}
