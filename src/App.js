import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Calendar from './components/Calendar/Calendar';
import Preferences from './components/Vibes/Vibes';
import AppContext from './AppContext'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: null,
      update_id: this.updateId
    }
  }
  updateId(id) {
    this.setState({user_id: id})
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <nav className="navigation">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/vibes'>Vibes</Link></li>
              <li><Link to='/calendar'>Calendar</Link></li>
            </ul>
          </nav>
          <section className="main">
            <Route exact path='/' component={Home}/>
            <Route path='/vibes' component={Preferences}/>
            <Route path='/calendar' component={Calendar}/>
          </section>
        </div>
      </AppContext.Provider>
      );
  }
  
}

export default App;
