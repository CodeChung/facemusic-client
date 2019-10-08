import React from 'react'
import Donut from '../Donut/Donut';
import PropTypes from 'prop-types'
import './Entry.css'

class Entry extends React.Component {
    state = {
        emotions: {}
    }
    componentDidMount() {
        if (this.props.entry) {
            const {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise} = this.props.entry
            const emotions = {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise}
            
            this.setState({emotions})
        }
    }
    render() {
        const url = this.props.entry ? this.props.entry.song.url.replace('track', 'embed/track') : ''
        return (
            <div>
                {this.props.calendar && <button onClick={() => this.props.resetCalendar()}>Return to Calendar</button>}
                <div className='entry'>
                    {this.props.entry && <img src={this.props.entry.img} alt='daily face'/>}
                    <div className='donut'>
                        {/* <h3>Emotional Analysis</h3> */}
                        <Donut emotions={this.state.emotions}/>
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    
                </div>
                <div className='entry-notes'>
                    <h3>Notes:</h3>
                    {this.props.entry && this.props.entry.notes}
                </div>
            </div>
        )
    }
}

Entry.propTypes = {
    calendar: PropTypes.bool,
    entry: PropTypes.shape({
        anger: PropTypes.string || PropTypes.number,
        contempt: PropTypes.string || PropTypes.number,
        disgust: PropTypes.string || PropTypes.number,
        fear: PropTypes.string || PropTypes.number,
        happiness: PropTypes.string || PropTypes.number,
        neutral: PropTypes.string || PropTypes.number,
        sadness: PropTypes.string || PropTypes.number,
        surprise: PropTypes.string || PropTypes.number,
        song: PropTypes.object,
        date_created: PropTypes.string,
        emotion_id: PropTypes.number,
        img: PropTypes.string,
        notes: PropTypes.string
    }),

}

export default Entry