import React from 'react'
import AppContext from '../../AppContext'
import Artist from '../Artist/Artist'
import Track from '../Track/Track'
import ServerApiService from '../../services/server-api-service';

class SavedVibes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artists: [],
            tracks: [],
            view: 'artists',
            error: ''
        }
    }
    componentDidMount() {
        ServerApiService.getSavedSeeds()
        .then(res => {
            const { tracks, artists } = res    
            this.setState({artists, tracks})
        })
    }
    handleClick(type, id) {
        ServerApiService.deleteSeed(type, id)
            .then(res => {
                if (res.error) {
                    this.setState({error: res.error})
                }
            })
        if (type === 'artist') {
            const artists = this.state.artists.filter(artist => artist.id !== id)
            this.setState({artists})
        } else {
            const tracks = this.state.tracks.filter(track => track.id !== id)
            this.setState({tracks})
        }
    }
    clickView(type) {
        this.setState({view: type})
    }
    renderView() {
        const artists = this.state.artists.map((artist, index) => {
            const { name, id, img } = artist
            return <Artist 
                key={index} 
                name={name} 
                img={img}
                id={artist.id}
                message='Delete'
                handleClick={() => this.handleClick('artist', id)}
                />
        })
        const tracks = this.state.tracks.map((track, index) => {
            const { name, img, id, artist, album } = track
            return <Track
                key={index}
                name={name}
                img={img}
                id={id}
                artist={artist}
                album={album}
                message='Delete'
                handleClick={() => this.handleClick('track', id)}
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
        const active = 'seed-active'
        return (
            <section className='saved-vibes'>
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
                <br/>
                {this.state.error}
                {this.renderView()}
            </section>
        )
    }
}

export default SavedVibes
SavedVibes.contextType = AppContext