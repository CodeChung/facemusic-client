import React from 'react';
import { Redirect } from 'react-router-dom';
import Donut from '../../components/Donut/Donut';
import styled from 'styled-components';
import './DemoPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Image = styled.div`
    background-image: url(${props => props.img}) ;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 50vh;
    height: 50vh;
    border-radius: 5px
`

const emotionsData = {
    anger: "0.002",
    contempt: "0.000",
    disgust: "0.000",
    fear: "0.013",
    happiness: "0.050",
    neutral: null,
    sadness: "0.026",
    surprise: "0.908",
}

class DemoPage extends React.Component { 
    state = {
        entry: {},
        redirect: false,
    }
    goBack() {
        this.setState({ redirect: true })
    }
    render() {
        const { entry, redirect } = this.state
        const url = 'https://open.spotify.com/embed/track/42zd6DYQ4o4SECmTITrM1U'
        if (redirect) {
            return <Redirect to='/' />
        }
        return (
            <section className='demo-page'>
                <FontAwesomeIcon className='calendar-back-arrow' icon={faHandPointLeft} onClick={() => this.goBack()} />
                <div className='entry'>
                    <div className='entry-face'>
                        <h2>{moment(new Date()).format('MMM DD, YYYY')}</h2>
                        <Image img={'https://snipboard.io/LYoEvV.jpg'} />
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    <div className='entry-graph'>
                        <div className='donut'>
                            <h3>Emotional Analysis</h3>
                            <Donut emotions={emotionsData}/>
                        </div>
                        <div className='entry-notes'>
                            <h3>Notes:</h3>
                            <div className='demo-entry'
                                contentEditable='true'>
                                Wow, It's been a weird day. I almost got eaten by a bear.
                                But I also got a free burger, so it kind of evens out.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DemoPage;