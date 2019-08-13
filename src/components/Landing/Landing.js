import React from 'react'
import './Landing.css'

function LandingInfo() {
    return (
        <section className='landing-main'>
            <h1>Facejams</h1>
            <h4>Listen to your Face</h4>
            <p>Facejams is a photojournal/playlist generator</p>
            <p>Facejams analyzes the emotions featured on your face and returns music that reflects how you feel</p>
            <p>Use it to keep track of your moods, find music you like, and look back at memories</p>
            <h3>Steps</h3>
            <ol>
                <li>Save your musical preferences</li>
                <li>Take a picture that shows your daily mood</li>
                <li>Jot down some memories</li>
                <li>Find some facejams!</li>
            </ol>
        </section>
    )
}

export default LandingInfo