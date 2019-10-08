import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import CalendarPage from './routes/CalendarPage/CalendarPage';
import Preferences from './routes/VibesPage/Vibes';
import LoginPage from './routes/LoginPage/LoginPage'
import AppContext from './AppContext';
import ServerApiService from './services/server-api-service';
import TokenService from './services/token-service'
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import HomePage from './routes/HomePage/HomePage';
import DemoPage from './routes/DemoPage/DemoPage';
import SearchVibes from './components/SearchVibes/SearchVibes';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
      entry: {},
      tracks: [], 
      artists: []
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
  setEntry(entry) {
    this.setState({entry})
  }
  renderUserNav() {
    return (
      <nav className="navigation">
        <Link to='/' className='nav-start'>
          <h1>FaceJams</h1>
        </Link>
        <div className='nav-mid'>
          <Link to='/'>PhotoBooth</Link>
          <Link to='/calendar'>Calendar</Link>
          <Link to='/vibes'>Preferences</Link>
        </div>
        <div className='nav-end'>
          <Link to='/login' onClick={() => this.logout()}>Logout</Link>
        </div>
      </nav>
    )
  }
  renderUser() {
    return (
      <div className="App">
        <section className="main">
          <Route exact path='/' component={HomePage}/>
          <Route path='/vibes' component={Preferences}/>
          <Route path='/calendar' component={CalendarPage}/>
        </section>
      </div>
    )
  }
  renderNonNav() {
    return (
      <nav className="navigation">
        <Link to='/' className='nav-start'>
          <h1>FaceJams</h1>
        </Link>
        <div className='nav-end'>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>
      </nav>
    )
  }
  renderNonUser() {
    return (
      <div className="App">
        <section className="main-new-user">
          <Route exact path='/' component={LandingPage}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/register' render={props => <RegistrationPage refresh={() => this.rerender()}/>}/>
          <Route path='/demo' component={DemoPage} />
        </section>
      </div>
    )
  }
  render() {
    const { tracks, artists } = this.state
    const nav = TokenService.hasAuthToken() ? this.renderUserNav() : this.renderNonNav()
    let view = TokenService.hasAuthToken() ? this.renderUser() : this.renderNonUser()
    const contextValue = {
      setEntry: (entry) => this.setEntry(entry),
      rerender: () => this.rerender(),
      entry: this.state.entry,
      artists: this.state.artists,
      tracks: this.state.tracks,
      logged: false,
    }

    return (
      <BrowserRouter>
        <AppContext.Provider value={contextValue}>
          <div className='view'>
            {nav}
            {view}
          </div>
        </AppContext.Provider>
      </BrowserRouter>
      )
  }
  
}

export default App;
