import React from 'react'
import { Link } from 'react-router-dom';
import './Landing.css'

function LandingInfo() {
    return (
        <section className='landing-main'>
            <div className='landing-desc'>
                <h1>Facejams</h1>
                <h4>It's time to listen to your face.</h4>
                <p>Facejams is a photojournal/playlist generator.</p>
                <p>It analyzes the emotions featured on your face and returns music that reflects how you feel.</p>
                <p>Use it to keep track of your moods, find music you like, and look back at memories.</p>
                <Link to='/register'><button>Check it out</button></Link>
            </div>
            <img src='/images/heaphones.jpg' alt='headphones'/>
        </section>
    )
}

export default LandingInfo