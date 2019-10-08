import React from 'react';
import { Route, Link } from 'react-router-dom'
import SavedVibes from '../../components/SavedVibes/SavedVibes'
import SearchVibes from '../../components/SearchVibes/SearchVibes'
import Camera from 'react-html5-camera-photo';
import './Vibes.css'

class Preferences extends React.Component {
    state = {
        currentView: 'search'
    }
    render() {
        const current = this.state.currentView
        return (
            <section className='vibes'>
                <div className='vibes-nav'>
                    <Link 
                        to='/vibes/'
                        onClick={() => this.setState({ currentView: 'search' })}
                        className={current === 'search' ? 'active-vibe' : ''}>
                        Find Vibes
                    </Link>
                    <Link 
                        to='/vibes/saved'
                        onClick={() => this.setState({ currentView: 'saved' })}
                        className={current === 'saved' ? 'active-vibe' : ''}>
                        My Vibes
                    </Link>
                </div>
                <div className='vibes-main'>
                    <Route exact path='/vibes/' component={SearchVibes}/>
                    <Route path='/vibes/saved' component={SavedVibes}/>
                </div>
            </section>
        )
    }
}

export default Preferences;