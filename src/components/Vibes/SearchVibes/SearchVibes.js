import React from 'react'
import Artist from '../Artist/Artist'
import Track from '../Track/Track'
import ServerApiService from '../../../services/server-api-service'

class SearchVibes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            artists: [],
            tracks: [],
        }
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
        const artists = this.state.artists.filter(artist => artist.id !== id)
        this.setState({artists})
        ServerApiService.saveArtist(name, id, img)
    }
    addTrack(name, id, img, artist, album) {
        const tracks = this.state.tracks.filter(track => track.id !== id)
        this.setState({tracks})
        ServerApiService.saveTrack(name, id, img, artist, album)
    }
    render() {
        const artists = this.state.artists.map((artist, index) => {
            const { name, id, images } = artist
            const img = images.length > 0 ? images[0].url : 'https://www.placecage.com/280/280'
            return <Artist 
                key={index} 
                name={name} 
                img={img}
                id={artist.id}
                message='Add Vibe'
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
                messsage='Add Vibe'
                handleClick={() => this.addTrack(name, id, img, artist, album)}
            />
        })
        
        return (
            <section className='search-vibes'>
                <form className='add-vibe' onSubmit={event => this.handleSearch(event)}>
                    <label htmlFor='vibe'>Find Vibes</label>
                    <input 
                        id='vibe'
                        name='vibe' 
                        type='text' 
                        placeholder='Find your favorite songs or artists'
                        onChange={event => this.updateKeyword(event.target.value)}/>
                    <button>Search</button>
                </form>
                <div className='artists'>
                    <h2>Artists</h2>
                    {artists}
                </div>
                <div className='tracks'>
                    <h2>Tracks</h2>
                    {tracks}
                </div>
            </section>
        )
    }
}

export default SearchVibes