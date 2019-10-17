import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import TokenService from '../../services/token-service';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';

const Loading = styled.div `
  margin: 0 auto;
  justify-content: center;
  display: flex;
  
`

export default class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { loading: false, error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({ loading: true, error: null })
    const { user_name, password } = ev.target
    
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then(res => {
        user_name.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => alert(res.error))
  }
  render() {
    const { loading, error } = this.state

    return (
      <form
        className='LoginForm'
        onSubmit={this.handleSubmitJwtAuth}
      >
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
        <div className='user_name'>
          <label htmlFor='LoginForm__user_name'>
            User name
          </label>
          <input
            required
            placeholder='username'
            name='user_name'
            id='LoginForm__user_name'>
          </input>
        </div>
        <div className='password'>
          <label htmlFor='LoginForm__password'>
            Password
          </label>
          <input
            autoComplete='password'
            required
            placeholder='password'
            name='password'
            type='password'
            id='LoginForm__password'>
          </input>
        </div>
        {loading && <Loading><BounceLoader /></Loading>}
        <button type='submit'>
          Login
        </button>
      </form>
    )
  }
}
