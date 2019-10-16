import React from 'react'
import DemoPage from '../../routes/DemoPage/DemoPage'
import './Landing.css'

class LandingInfo extends React.Component {
    render() {
         return (
            <section className='landing-main'>
                <section className='landing-desc'>
                    <h1>Facejams</h1>
                    <h4>It's time to listen to that face.</h4>
                </section>
                <section className='landing-block'>
                    <div className='landing-block-text'>
                        <h2>Facejams is a photojournal/playlist generator.</h2>
                    </div>
                    <DemoPage />
                </section>
            </section>
        )
    }
   
}

export default LandingInfo