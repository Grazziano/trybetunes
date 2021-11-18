import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };

    this.saveFavorite = this.saveFavorite.bind(this);
  }

  handleChange = ({ target }) => {
    this.setState({ checked: target.checked }, () => {
      const checked = this.state;
      const { trackId, trackName, previewUrl } = this.props;
      if (checked) {
        return this.saveFavorite({ trackId, trackName, previewUrl });
      }
    });
  }

  async saveFavorite(object) {
    this.setState({ loading: true });
    await addSong(object);
    this.setState({ loading: false });
  }

  render() {
    const { trackId, trackName, previewUrl } = this.props;
    const { checked, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div>
        <label htmlFor="audio">
          { trackName }
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
        </label>
        <label htmlFor={ `checkbox-input-favorite-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            id={ `checkbox-input-favorite-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleChange }
            checked={ checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
