import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationPage.css'

export default class RegistrationPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }
  state = {
    success: false,
  }
  handleRegistrationSuccess = user => {
    const { history } = this.props
    debugger
    history.push('/login')
    this.setState({ success: true })
  }

  render() {
    const { success } = this.state
    if (success) {
      return <Redirect to='/login'/> 
    }
    return (
      <section className='registration-page'>
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    )
  }
}
