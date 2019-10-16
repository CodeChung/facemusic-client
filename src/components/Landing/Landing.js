import React from 'react'
import { Link } from 'react-router-dom';
import DemoPage from '../../routes/DemoPage/DemoPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import './Landing.css'

const Icon = styled.div `
    color: white;
    padding-bottom: 80px;
    font-size: 3.5em;
`

class LandingInfo extends React.Component {
    render() {
        return (
            <section className='landing-main'>
                <section className='landing-desc' id='home'>
                    <h1>Facejams</h1>
                    <h4>It's time to listen to that face.</h4>
                    <a href='#demo'><button>Demo</button></a>
                </section>
                <section className='landing-block'>
                    <img src='/images/wave.png' alt='wave' />
                    <div className='landing-block-text'>
                        <h2>Facejams is a photo album/playlist generator.</h2>
                    </div>
                    <DemoPage />
                </section>
                <div className='block-two-img'></div>
                <section className='landing-block block-two' id='demo'>
                    <h3>Use it to keep track of your emotions and explore new music that reflects your day.</h3>
                    <Icon><FontAwesomeIcon icon={faHeadphones} /></Icon>
                    <div className='block-two-text'>
                        <Link to='/demo'>Demo</Link>
                        <div className='line'></div>
                        <Link to='/register'>Register</Link>
                    </div>
                </section>
            </section>
        )
    }
   
}

export default LandingInfo