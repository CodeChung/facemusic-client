import React from 'react';
import Artist from './Artist/Artist';
import Track from './Track/Track';
import './Vibes.css'

class Preferences extends React.Component {
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
        const url = 'http://localhost:8000/api/music/search/' + keyword
        
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Search went wrong. Please try again')
                }
                return res.json()
            })
            .then(searchResults => {
                console.log(searchResults)
                const { artists, tracks } = searchResults
                this.setState({ artists, tracks })
            })
    }
    render() {
        const artists = this.state.artists.map((artist, index) => {
            return <Artist 
                key={index} 
                name={artist.name} 
                picture={artist.images}
                id={artist.id}
                />
        })
        const tracks = this.state.tracks.map((track, index) => {
            return <Track
                key={index}
                name={track.name}
                picture={track.images}
                id={track.id}
                artist={track.artist}
                album={track.album}
            />
        })
        return (
            <section className='vibes'>
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

export default Preferences;