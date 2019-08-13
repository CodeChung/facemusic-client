import React from 'react'
import ServerApiService from '../../services/server-api-service'
import Track from '../Track/Track';
import Donut from '../Donut/Donut'

class Results extends React.Component {
    constructor(props) {
        super(props)
        // maybe split up components
        this.state = {
            emotions: {},
            notes: '',
            tracks: [],
            chosenTrack: '',
            photo: '',
        }
    }
    componentDidMount() {
        const emotions = this.props.emotion
        const photo = this.props.photo
        this.setState({ emotions, photo })
    }
    updateNotes(notes) {
        this.setState({notes})
    }
    handleSubmit(event) {
        event.preventDefault()
        const emotions = this.props.emotion
        //TODO implement user_id as second parameter
        ServerApiService.getRecommendations(emotions)
            .then(result => this.setState({tracks: result}))
    }
    //if chosenTrack already filled, patch entry else set new chosen track and entry
    saveEntry(track) {
        const { notes, photo, emotions } = this.state
        ServerApiService.saveEntry(notes, photo, track, emotions)
            .then(entry => {console.log(entry); this.context.setEntry(entry)})
        this.setState({chosenTrack: track})

    }
    render() {
        const tracks = this.state.tracks.map((track, index) => {
            const { name, images, artist, album, url } = track
            const img = images.length > 0 ? images[0].url : 'https://www.placecage.com/280/280'
            return (
                <div className='recommendation-track' key={index}>
                    <a href={url} rel='noopener noreferrer' target='_blank'>
                        <Track 
                        name={name}
                        img={img}
                        artist={artist}
                        album={album}
                        message='Listen'/>
                    </a>
                    <button
                        onClick={() => console.log('cheese')}>
                        Save
                    </button>
                </div>
            )
        })
        return (
            <div className='emotion-graph'>
                <img src={this.state.photo} alt='journal face'/>
                <Donut
                    emotions={this.state.emotions}
                    background={this.state.photo}
                />
                <form onSubmit={event => this.handleSubmit(event)}>
                    <legend>Today's Highlights</legend>
                    <textarea 
                        placeholder='Today I...'
                        onChange={e => this.updateNotes(e.target.value)}
                        />
                    <br/>
                    <button>Find Track</button>
                </form>
                {this.state.tracks && <h3>Recommendations</h3>}
                <div className='recommendation-list'>
                    {tracks}
                </div>
            </div>
        )
    }
}

export default Results