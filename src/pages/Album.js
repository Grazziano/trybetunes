import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      // idAlbum: '',
      artistName: '',
      albumName: '',
      favoritesSongsList: [],
      musicList: [],
      loading: false,
      // checked: false,
    };

    this.updateStateSongsList = this.updateStateSongsList.bind(this);
    this.getFavoritesSongsList = this.getFavoritesSongsList.bind(this);
  }

  componentDidMount() {
    this.updateStateSongsList();
    this.getFavoritesSongsList();
  }

  async getFavoritesSongsList() {
    this.setState({ loading: true }, async () => {
      const recoverFavotitesSongs = await getFavoriteSongs();
      this.setState(
        {
          favoritesSongsList: [...recoverFavotitesSongs],
          loading: false,
        },
      );
    });
  }

  async updateStateSongsList() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const data = await getMusics(id);
    const name = data[0].artistName;
    const album = data[0].collectionName;
    this.setState(
      {
        // idAlbum: id,
        artistName: name,
        albumName: album,
        musicList: data,
        loading: false,
      },
    );
  }

  render() {
    const { artistName, albumName, favoritesSongsList, musicList, loading } = this.state;
    const [, ...data] = musicList;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>

        { artistName !== '' ? <h2 data-testid="artist-name">{ artistName }</h2> : null }
        { albumName !== '' ? <h2 data-testid="album-name">{ albumName }</h2> : null }

        { data.length !== 0 ? data.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackId={ song.trackId }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            favoritesSongsList={ favoritesSongsList }
            favoriteSelect={
              !!favoritesSongsList.some((music) => music.trackId === song.trackId)
            }
          />
        )) : null }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
