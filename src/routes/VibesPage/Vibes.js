import React from 'react';
import { Route, Link } from 'react-router-dom'
import SavedVibes from '../../components/SavedVibes/SavedVibes'
import SearchVibes from '../../components/SearchVibes/SearchVibes'
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
                        to='/seeds/'
                        onClick={() => this.setState({ currentView: 'search' })}
                        className={current === 'search' ? 'active-vibe' : ''}>
                        Find Seeds
                    </Link>
                    <Link 
                        to='/seeds/saved'
                        onClick={() => this.setState({ currentView: 'saved' })}
                        className={current === 'saved' ? 'active-vibe' : ''}>
                        My Seeds
                    </Link>
                </div>
                <div className='vibes-main'>
                    <Route exact path='/seeds/' component={SearchVibes}/>
                    <Route path='/seeds/saved' component={SavedVibes}/>
                </div>
            </section>
        )
    }
}

export default Preferences;