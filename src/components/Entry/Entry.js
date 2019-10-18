import React from 'react'
import styled from 'styled-components';
import Donut from '../Donut/Donut'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import './Entry.css'
import moment from 'moment';
import ServerApiService from '../../services/server-api-service';

const Image = styled.div`
    background-image: url(${props => props.img});
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 50vh;
    height: 50vh;
    border-radius: 5px
`

class Entry extends React.Component {
    state = {
        emotions: {},
        deleteError: '',
        deleteModal: false,
    }
    componentDidMount() {
        if (this.props.entry) {
            const {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise} = this.props.entry
            const emotions = {anger, contempt, disgust, fear, happiness, neutral, sadness, surprise}
            
            this.setState({emotions})
        }
    }
    toggleDelete = event => {
        const {deleteModal} = this.state
        this.setState({
            deleteModal: !deleteModal
        })
    }
    deleteEntry = event => {
        if (this.props.entry) {
            ServerApiService.deleteEntry(this.props.entry.id)
                .then(res => this.props.resetCalendar())
                .catch(res => this.setState({ deleteError: res.message }))
        }
    }
    render() {
        const { deleteError, deleteModal } = this.state
        const url = this.props.entry ? this.props.entry.song.url.replace('track', 'embed/track') : ''
        
        if (deleteModal) {
            return (
                <section className='entry-view'>
                    <div className='entry-delete-modal'>
                        <h2>Are you sure?</h2>
                        {deleteError}
                        <button onClick={this.deleteEntry}>Yes</button>
                        <button onClick={this.toggleDelete}>No</button>
                    </div>
                </section>
            )
        }

        return (
            <section className='entry-view'>
                {this.props.calendar && <FontAwesomeIcon className='calendar-back-arrow' icon={faHandPointLeft} onClick={() => this.props.resetCalendar()} />}
                <div className='entry'>
                    <div className='entry-face'>
                        <h2>{this.props.entry && moment(this.props.entry.last_logged).format('MMM DD, YYYY')}</h2>
                        <Image img={this.props.entry ? this.props.entry.img : ''} />
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        {/* <button onClick={this.toggleDelete}>Delete</button> */}
                    </div>
                    <div className='entry-graph'>
                        <div className='donut'>
                            <h3>Emotional Analysis</h3>
                            <Donut emotions={this.state.emotions}/>
                        </div>
                        <div className='entry-notes'>
                            <h3>Notes:</h3>
                            {this.props.entry && this.props.entry.notes}
                        </div>
                    </div>
                </div>
            </section>
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