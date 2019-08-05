import React from 'react'
import Donut from '../Donut/Donut';
import './Entry.css'

class Entry extends React.Component {
    state = {
        emotions: {}
    }
    componentDidMount() {
        const {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise} = this.props.entry
        const emotions = {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise}
        
        this.setState({emotions})
    }
    render() {
        const url = this.props.entry.song.url.replace('track', 'embed/track')
        return (
            <div>
                <button onClick={() => this.props.resetCalendar()}>Return to Calendar</button>
                <div className='entry'>
                    <img src={this.props.entry.img} alt='daily face'/>
                    <div className='donut'>
                        {/* <h3>Emotional Analysis</h3> */}
                        <Donut emotions={this.state.emotions}/>
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    
                </div>
                <div className='entry-notes'>
                    <h3>Notes:</h3>
                    {this.props.entry.notes}
                </div>
            </div>
        )
    }
}

export default Entry