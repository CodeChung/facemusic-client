import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { user_name, password } = ev.target

    this.setState({ error: null })
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
    })
      .then(user => {
        user_name.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })

    
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='registration-form'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user-name'>
          <label htmlFor='registration-user-name'>
            User name
          </label>
          <input
            placeholder='username'
            name='user_name'
            type='text'
            required
            id='registration-user-name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='registration-password'>
            Password
          </label>
          <input
            placeholder='password'
            name='password'
            type='password'
            required
            id='registration-password'>
          </input>
        </div>
        <button type='submit'>
          Register
        </button>
      </form>
    )
  }
}

export default RegistrationForm