import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import CalendarPage from './routes/CalendarPage/CalendarPage';
import Preferences from './components/Vibes/Vibes';
import LoginPage from './components/Login/Login'
import AppContext from './AppContext';
import ServerApiService from './services/server-api-service';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id: null,
      update_id: this.updateId,
      tracks: [],
      artists:[],
    }
  }
  updateId(id) {
    this.setState({user_id: id})
  }
  componentDidMount() {
    //TODO replace with user_id
    ServerApiService.getSavedSeeds(1)
      .then(res => {
        const { tracks, artists } = res
        this.setState({ tracks, artists })
      })
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
            <Route path='/calendar' component={CalendarPage}/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/register' component={RegistrationPage}/>
          </section>
        </div>
      </AppContext.Provider>
      );
  }
  
}

export default App;
