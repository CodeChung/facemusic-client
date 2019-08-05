import React from 'react';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import LandingPage from './routes/LandingPage/LandingPage';
import CalendarPage from './routes/CalendarPage/CalendarPage';
import Preferences from './components/Vibes/Vibes';
import LoginPage from './routes/LoginPage/LoginPage'
import AppContext from './AppContext';
import ServerApiService from './services/server-api-service';
import TokenService from './services/token-service'
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
    }
  }
  componentDidMount() {
    ServerApiService.getSavedSeeds()
      .then(res => {
        const { tracks, artists } = res
        this.setState({ tracks, artists })
      })
  }
  logout() {
    TokenService.clearAuthToken()
    this.setState({update: false})
  }
  rerender() {
    this.setState({update: true})
  }
  renderUser() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <nav className="navigation">
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/vibes'>Vibes</Link></li>
              <li><Link to='/calendar'>Calendar</Link></li>
              <li><Link to='/login' onClick={() => this.logout()}>Logout</Link></li>
            </ul>
          </nav>
          <section className="main">
            <Route exact path='/' component={Home}/>
            <Route path='/vibes' component={Preferences}/>
            <Route path='/calendar' component={CalendarPage}/>
          </section>
        </div>
      </AppContext.Provider>
    )
  }
  renderNonUser() {
    return (
      <div className="App">
        <nav className="navigation">
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
          </ul>
        </nav>
        <section className="main">
          <Route exact path='/' component={LandingPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/register' render={props => <RegistrationPage refresh={() => this.rerender()}/>}/>
        </section>
      </div>
    )
  }
  render() {
    const view = TokenService.hasAuthToken() ? this.renderUser() : this.renderNonUser()
    return (
      <div className='view'>
        {view}
      </div>
        
      )
  }
  
}

export default App;
