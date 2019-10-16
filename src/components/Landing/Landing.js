import React from 'react'
import { Link } from 'react-router-dom';
import DemoPage from '../../routes/DemoPage/DemoPage'
import './Landing.css'

class LandingInfo extends React.Component {
    state = {
        demoActive: false
    }
    render() {
        const { demoActive } = this.state
         return (
            <section className='landing-main'>
                <section className='landing-desc'>
                    <h1>Facejams</h1>
                    <h4>It's time to listen to that face.</h4>
                    <button><a href='#demo'>Demo</a></button>
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
                    <div className='block-two-text'>
                        <div className='demo'>
                            DEMO 
                        </div>
                        <div class='line'></div>
                        <Link to='/register'>Register</Link>
                    </div>
                </section>
            </section>
        )
    }
   
}

export default LandingInfo