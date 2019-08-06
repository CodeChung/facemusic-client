import React from 'react'
import TokenService from '../../services/token-service';
import HomePage from '../../routes/HomePage/HomePage';

class LandingPage extends React.Component {
    render() {
        const view = TokenService.hasAuthToken() ? <HomePage/> : <div>Yolo</div>
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default LandingPage