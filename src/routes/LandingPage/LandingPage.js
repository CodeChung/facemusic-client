import React from 'react'
import TokenService from '../../services/token-service';
import HomePage from '../../routes/HomePage/HomePage';
import LandingInfo from '../../components/Landing/Landing';

class LandingPage extends React.Component {
    render() {
        const view = TokenService.hasAuthToken() ? <HomePage/> : <LandingInfo/>
        return (
            <div className='LandingPage'>
                {view}
            </div>
        )
    }
}

export default LandingPage