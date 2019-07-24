import React from 'react';
import { Route, Link } from 'react-router-dom'
import SavedVibes from './SavedVibes/SavedVibes'
import SearchVibes from './SearchVibes/SearchVibes'
import './Vibes.css'

class Preferences extends React.Component {
    onComponentDidMount() {
        
    }
    render() {
        return (
            <section className='vibes'>
                <div className='vibes-nav'>
                    <ul>
                        <li><Link to='/vibes/'>Find Vibes</Link></li>
                        <li><Link to='/vibes/saved'>My Vibes</Link></li>
                    </ul>
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