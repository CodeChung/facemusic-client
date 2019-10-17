import React from 'react';
import { Redirect } from 'react-router-dom';
import Donut from '../../components/Donut/Donut';
import styled from 'styled-components';
import './DemoPage.css';
import moment from 'moment';
import ContentEditable from 'react-contenteditable';

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
        html: `<span className='tooltiptext'>It analyzes the emotions featured on your face and returns music that reflects how you feel.</span>`,
    }
    render() {
        const { html, redirect } = this.state
        const url = 'https://open.spotify.com/embed/track/42zd6DYQ4o4SECmTITrM1U'
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
                        <Image img={'https://i.imgur.com/nFQciCR.jpg'} />
                        <iframe title='spotify' src={url} frameBorder="0" allowtransparency="true" allow="encrypted-media"><span className='tooltiptext-left'>It analyzes the emotions featured on your face and returns music that reflects how you feel.</span></iframe>
                    </div>
                    <div className='entry-graph'>
                        <div className='donut'>
                            <h3>Emotional Analysis</h3>
                            <Donut emotions={emotionsData}/>
                        </div>
                        <div className='entry-notes tooltip'>
                            <h3>Notes:</h3>
                            <ContentEditable
                                className='demo-entry'
                                innerRef={this.contentEditable}
                                html={html}
                                disabled={false}      
                                onChange={this.handleChange} 
                                tagName='article' 
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default DemoPage;