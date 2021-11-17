import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      // idAlbum: '',
      artistName: '',
      albumName: '',
      musicList: [],
      loading: false,
    };

    this.updateStateSongsList = this.updateStateSongsList.bind(this);
  }

  componentDidMount() {
    this.updateStateSongsList();
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
    const { artistName, albumName, musicList, loading } = this.state;
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
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
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
