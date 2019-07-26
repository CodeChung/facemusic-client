import React from 'react'
import { ResponsivePie } from '@nivo/pie'
import ServerApiService from '../../../services/server-api-service';
import Track from '../../Vibes/Track/Track';

class Results extends React.Component {
    constructor(props) {
        super(props)
        // maybe split up components
        this.state = {
            emotionData: [],
            notes: '',
            tracks: []
        }
    }
    componentDidMount() {
        const emotions = this.props.emotion
        const neutralOffset = emotions.neutral
        const emotionData = Object.entries(this.props.emotion).filter(emotion => emotion[1] > 0 && emotion[0] !== 'neutral')
        .map(emotion => 
            ({
                id: emotion[0],
                value: emotion[1]/neutralOffset
            }))
        this.setState({emotionData})
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
    saveRecommendation(track) {
        console.log(track)
    }
    render() {
        const emotionData = Object.entries(this.props.emotion).filter(emotion => emotion[1] > 0)
            .map(emotion => 
                ({
                    id: emotion[0],
                    value: emotion[1]
                }))

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
                        message='🎧'/>
                    </a>
                    <button
                        onClick={() => this.saveRecommendation(track)}>
                        Save
                    </button>
                </div>
            )
        })
        return (
            <div className='emotion-graph'>
                <ResponsivePie 
                    data={emotionData} 
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'nivo' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#333333"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
                <form onSubmit={event => this.handleSubmit(event)}>
                    <legend>Today's Highlights</legend>
                    <textarea 
                        placeholder='Today I...'
                        onChange={e => this.updateNotes(e.target.value)}
                        />
                    <button>Find Track</button>
                </form>
                {tracks}
            </div>
        )
    }
}

export default Results