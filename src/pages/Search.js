import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      albuns: [],
      buttonIsDisabled: true,
      inputValue: '',
      loading: false,
      notFoundMessage: '',
    };

    this.search = this.search.bind(this);
  }

  handleChange = ({ target }) => {
    const minSize = 2;
    const valueLength = target.value.length;
    const { value } = target;

    if (valueLength >= minSize) {
      this.setState(
        {
          buttonIsDisabled: false,
          inputValue: value,
        },
      );
    } else {
      this.setState(
        {
          buttonIsDisabled: true,
          inputValue: value,
        },
      );
    }
  }

  async search() {
    const { inputValue } = this.state;
    this.setState({ loading: true });
    const findAll = await searchAlbumsAPI(inputValue);
    // console.log(findAll);
    this.setState(
      {
        albuns: [...findAll],
        loading: false,
      },
    );

    const searchInput = document.getElementById('input-search');
    searchInput.value = '';

    if (findAll.length === 0) {
      this.setState(
        {
          notFoundMessage: 'Nenhum álbum foi encontrado',
        },
      );
    }
  }

  render() {
    const { albuns, buttonIsDisabled, loading, inputValue, notFoundMessage } = this.state;

    // if (loading) return <Loading />;

    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          type="text"
          id="input-search"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonIsDisabled }
          onClick={ this.search }
        >
          Pesquisar
        </button>

        { loading ? <Loading /> : null }

        { albuns.length > 0 ? `Resultado de álbuns de: ${inputValue}` : null }

        { albuns.length > 0 ? albuns.map((album) => (
          // <div key={ album.artistId }>
          //   <img src={ album.artworkUrl100 } alt={ album.artistName } />
          //   <h4>{ album.collectionName }</h4>
          //   <p>{ album.artistName }</p>
          // </div>
          <Link
            data-testid={ () => `link-to-album-${album.collectionId}` }
            key={ album.artistId }
            to={ `/album/${album.collectionId}` }
          >
            <div>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
              <h3>{ album.collectionName }</h3>
              <p>{ album.artistName }</p>
            </div>
          </Link>
        )) : null }

        { notFoundMessage !== '' ? notFoundMessage : null }
      </div>
    );
  }
}
