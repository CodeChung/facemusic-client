import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import AppContext from '../../AppContext';

class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'

    history.push(destination)
    this.context.rerender()
  }

  render() {
    return (
      <section className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    )
  }
}

LoginPage.contextType = AppContext

export default LoginPage