import React from 'react'
import AppContext from '../../../AppContext'
import Artist from '../Artist/Artist'
import Track from '../Track/Track'
import ServerApiService from '../../../services/server-api-service';

//Question: when I refresh this route, the saved data doesn't show up. Why? Should I get rid of state altogether? why a
class SavedVibes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artists: [],
            tracks: [],
        }
    }
    componentDidMount() {
        const artists = this.context.artists.map((artist, index) => {
            console.log(artist)
            const { name, id, img } = artist
            return <Artist 
                key={index} 
                name={name} 
                img={img}
                id={artist.id}
                message='Delete Vibe'
                //TODO replace with real user_id later
                handleClick={() => this.handleClick(id, 1, 'artist')}
                />
        })
        const tracks = this.context.tracks.map((track, index) => {
            const { name, img, id, artist, album } = track
            return <Track
                key={index}
                name={name}
                img={img}
                id={id}
                artist={artist}
                album={album}
                message='Delete Vibe'
                handleClick={() => this.handleClick(name, id, img, artist, album)}
            />
        })
        this.setState({artists, tracks})
    }
    handleClick(id, user_id, type) {
        //TODO implement delete service
        // ServerApiService.deleteSeed(id, user_id, type)
    }
    render() {
        return (
            <section className='saved-vibes'>
                <div className='artists'>
                    <h2>Artists</h2>
                    {this.state.artists}
                </div>
                <div className='tracks'>
                    <h2>Tracks</h2>
                    {this.state.tracks}
                </div>
            </section>
        )
    }
}

export default SavedVibes
SavedVibes.contextType = AppContext