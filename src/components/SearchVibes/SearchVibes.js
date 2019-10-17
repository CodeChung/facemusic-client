import React from 'react'
import Artist from '../Artist/Artist'
import Track from '../Track/Track'
import ServerApiService from '../../services/server-api-service'
import AppContext from '../../AppContext'


class SearchVibes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            artists: [],
            tracks: [],
            view: 'artists',
            savedArtists: [],
            savedTracks: [],
            loading: false,
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        ServerApiService.getSavedSeeds()
        .then(res => {
            const { tracks, artists } = res
            let savedTracks = tracks
            let savedArtists = artists
            this.setState({savedArtists, savedTracks, loading: false })
        })
    }
    updateKeyword(keyword) {
        this.setState({keyword})
    }
    handleSearch(event) {
        event.preventDefault()
        const keyword = this.state.keyword
        ServerApiService.getSpotifySearch(keyword)
            .then(result => {
                const { artists, tracks } = result
                this.setState({ artists, tracks })
            })
    }
    addArtist(name, id, img) {
        const artists = this.state.artists.filter(artist => {
            return artist.id !== id})
        this.setState({artists})
        ServerApiService.saveArtist(name, id, img)
            .then(res => res)
    }
    addTrack(name, id, img, artist, album) {
        const tracks = this.state.tracks.filter(track => track.id !== id)

        this.setState({tracks})
        ServerApiService.saveTrack(name, id, img, artist, album)
    }
    clickView(type) {
        this.setState({view: type})
    }
    renderView() {
        const artists = this.state.artists.map((artist, index) => {
            const { name, id, images } = artist
            const img = images.length > 0 ? images[0].url : 'https://www.placecage.com/280/280'
            return <Artist 
                key={index} 
                name={name} 
                img={img}
                id={artist.id}
                message='Save'
                handleClick={() => this.addArtist(name, id, img)}
                />
        })
        const tracks = this.state.tracks.map((track, index) => {
            const { name, images, id, artist, album } = track
            const img = images.length > 0 ? images[0].url : 'https://www.placecage.com/300/300'
            return <Track
                key={index}
                name={name}
                img={img}
                id={id}
                artist={artist}
                album={album}
                message='Save'
                handleClick={() => this.addTrack(name, id, img, artist, album)}
            />
        })
        return this.state.view === 'artists' ?
            <div className='vibes-list'>
                {artists}
            </div>
            :
            <div className='vibes-list'>
                {tracks}
            </div>
    }
    render() {
        const { loading, savedArtists, savedTracks, artists, tracks } = this.state
        const message = (savedArtists.length + savedTracks.length + artists.length + tracks.length) ? 
            'Want Facejams based on music you like? Save your artist/track preferences here.' 
            : 
            <span className='new-user-seeds'>First, please add 5 or more seeds before starting.<br />Then head over to the home page.</span>
        const active = 'seed-active'
        if (loading) {
            return <div/>
        }
        return (
            <section className='search-vibes'>
                <form className='add-vibe' onSubmit={event => this.handleSearch(event)}>
                    <label htmlFor='vibe'>{message}</label>
                    <br/>
                    <input 
                        id='vibe'
                        name='vibe' 
                        type='text' 
                        placeholder='Find your favorite songs or artists'
                        onChange={event => this.updateKeyword(event.target.value)}/>
                    <button>Search</button>
                </form>
                <nav className='seed-toggle'>
                    <ul>
                        <li>
                            <button 
                                className={this.state.view === 'artists' ? active : ''}
                                onClick={() => this.clickView('artists')}>
                                Artists
                            </button>
                        </li>
                        <li>
                            <button 
                                className={this.state.view === 'tracks' ? active : ''}
                                onClick={() => this.clickView('tracks')}>
                                Tracks
                            </button>
                        </li>
                    </ul>
                </nav>
                {this.renderView()}
            </section>
        )
    }
}

SearchVibes.contextType = AppContext

export default SearchVibes