import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      loading: false,
    };

    this.saveFavorite = this.saveFavorite.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.isFavorite();
  }

  handleChange = ({ target }) => {
    this.setState({ checked: target.checked }, () => {
      const checked = this.state;
      const { trackName, previewUrl, trackId } = this.props;
      if (checked) {
        return this.saveFavorite({ trackName, previewUrl, trackId });
      }
      return this.removeFavorite({ trackName, previewUrl, trackId });
    });
  }

  isFavorite() {
    const { trackId, favoritesSongsList } = this.props;

    const exist = favoritesSongsList.some((song) => song.trackId === trackId);
    console.log(exist);
    if (exist) this.setState({ checked: true });
  }

  async saveFavorite(object) {
    this.setState({ loading: true });
    await addSong(object);
    this.setState({ loading: false });
  }

  async removeFavorite(object) {
    this.setState({ loading: true });
    await removeSong(object);
    const songs = await getFavoriteSongs();
    const newArrSongs = songs.filter((song) => song.trackId !== object.trackId);
    newArrSongs.forEach((element) => {
      this.saveFavorite(element);
    });
    this.setState({ checked: false, loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId, favoriteSelect } = this.props;
    const {
      checked,
      loading,
    } = this.state;

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
            checked={ favoriteSelect || checked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  favoritesSongsList: PropTypes.arrayOf(
    PropTypes.shape({
      trackId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  favoriteSelect: PropTypes.bool.isRequired,
};
