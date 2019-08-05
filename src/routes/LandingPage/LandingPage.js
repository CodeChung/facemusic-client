import React from 'react'
import TokenService from '../../services/token-service';
import Home from '../../components/Home/Home';

class LandingPage extends React.Component {
    render() {
        const view = TokenService.hasAuthToken() ? <Home/> : <div>Yolo</div>
        return (
            <div>
                {view}
            </div>
        )
    }
}

export default LandingPage