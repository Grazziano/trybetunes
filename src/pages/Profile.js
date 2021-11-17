import React, { Component } from 'react';
import Header from '../components/Header';
// import Loading from '../components/Loading';
// import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     name: '',
  //     image: '',
  //     email: '',
  //     description: '',
  //     loading: false,
  //   };

  //   this.loadUser = this.loadUser.bind(this);
  // }

  // componentDidMount() {
  //   this.loadUser();
  // }

  // async loadUser() {
  //   this.setState({ loading: true });
  //   const data = await getUser();
  //   const { name, image, email, description } = data;
  //   this.setState(
  //     {
  //       name,
  //       image,
  //       email,
  //       description,
  //       loading: false,
  //     },
  //   );
  // }

  render() {
    // const { name, image, email, description, loading } = this.state;

    // if (loading) return <Loading />;

    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
        {/* <img data-testid="profile-image" src={ image } alt={ name } />
        <label htmlFor="name-input">
          Nome:
          <input type="text" disabled="true" id="name-input" value={ name } />
        </label>
        <label htmlFor="email-input">
          E-mail:
          <input type="email" disabled="true" id="email-input" value={ email } />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <textarea disabled="true" id="description-input">{ description }</textarea>
        </label> */}
      </div>
    );
  }
}
