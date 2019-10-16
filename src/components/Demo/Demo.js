import React from 'react';
import { Redirect } from 'react-router-dom';
import Donut from '../../components/Donut/Donut';
import styled from 'styled-components';
import './Demo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const Image = styled.div`
    background-image: url(${props => props.img}) ;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width: 52vh;
    height: 52vh;
    border-radius: 5px
`

const emotionsData = {
    anger: "0",
    contempt: "0.000",
    disgust: "0.000",
    fear: "0",
    happiness: "0.0",
    neutral: 1,
    sadness: "0.0",
    surprise: "0",
}

class Demo extends React.Component { 
    state = {
        entry: {},
        redirect: false,
    }
    render() {
        const { entry, redirect } = this.state
        const url = 'https://open.spotify.com/embed/track/6QAOd9yhzUrer1shQvPANO'
        if (redirect) {
            return <Redirect to='/' />
        }
        return (
            <section className='demo-page'>
                <div className='entry'>
                    <div className='entry-face'>
                        <h2>
                            {moment(new Date()).format('MMM DD, YYYY')}
                        </h2>
                        <Image img={'https://www.placecage.com/757/1001'} />
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"><span className='tooltiptext-left'>It analyzes the emotions featured on your face and returns music that reflects how you feel.</span></iframe>
                    </div>
                    <div className='entry-graph'>
                        <div className='donut'>
                            <h3>Emotional Analysis</h3>
                            <Donut emotions={emotionsData}/>
                        </div>
                        <div className='entry-notes'>
                            <h3>Notes:</h3>
                            <div className='demo-entry tooltip'
                                contentEditable='true'>
                                <span className='tooltiptext'>Take a picture, analyze emotions, listen to music. Facejams :)</span>
                                Take a picture on the left, then analyze.
                                <br/>
                                <br/>
                                You can write here, by the way. 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Demo;