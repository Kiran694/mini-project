import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const body = await response.json()
    console.log(body)

    if (response.ok === true) {
      const jwtToken = body.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 90})
      const {history} = this.props
      history.replace('/')
    } else {
      const {isError, errorMsg} = this.state

      const error = body.error_msg
      this.setState({isError: true, errorMsg: error})
    }
  }

  render() {
    const {isError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="content-container">
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <div className="form-top-container">
              <img
                className="logo-image"
                src="https://res.cloudinary.com/damurfwvm/image/upload/v1678865326/Vector_x6c36k.png"
                alt="website logo"
              />
              <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
              <h1 className="login-heading">Login</h1>
            </div>
            <div className="inputs-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input"
                type="text"
                id="username"
                onChange={this.onUsernameChange}
              />
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input"
                type="password"
                id="password"
                onChange={this.onPasswordChange}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {isError && <p className="error-msg">{errorMsg}</p>}
            </div>
          </form>
        </div>
        <img
          className="img"
          src="https://res.cloudinary.com/damurfwvm/image/upload/v1678800999/Rectangle_1456_augvqb.png"
          alt="website login"
        />
        <img
          src="https://res.cloudinary.com/damurfwvm/image/upload/v1678800999/Rectangle_1456_augvqb.png"
          alt="website img"
          className="small-devices-img"
        />
      </div>
    )
  }
}

export default Login
