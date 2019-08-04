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
        return (
            // <div className='entry-page'>
            //     {/* <button onClick={this.props.resetCalendar}>return</button> */}
            //     {/* <div className='entry'>
                    
            //         <div className='doughnut'>
            //             <Donut emotions={this.state.emotions}/>
            //         </div>
            //         <img src={this.props.entry.img} alt='daily face'/>
                    
                    
            //     </div>
            //     <div className='notes'>
            //         <h2>Notes:</h2>
            //         {this.props.notes}
            //     </div> */}
            //     <div className='entry'>
            //         <Donut emotions={this.state.emotions}/>
                    
            //     </div>
            //     {/* <iframe src="https://open.spotify.com/embed/track/5X82VFLvjpeWQlTSShqqj0" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
            // </div>
            <Donut emotions={this.state.emotions}/>
        )
    }
}

export default Entry