import React, { Component } from "react"
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "", password: "", showPassword: false }
    this.handleChangeUsername = this.handleChangeUsername.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
    this.handleType = this.handleType.bind(this)
  }
  handleChangeUsername(event) {
    this.setState({ username: event.target.value })
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value })
  }
  handleType(event) {
    event.preventDefault()
  }
  passwordToggle = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }
  passwordState = () => {
    if (this.state.showPassword) {
      return "text"
    } else return "password"
  }
  state = {}
  render() {
    console.log(this.passwordState())
    return (
      <div>
        <p>Twitch Username</p>
        <input
          value={this.state.username}
          onChange={this.handleChangeUsername}
        ></input>
        <p>Password</p>
        <input
          type={this.passwordState()}
          value={this.state.password}
          onChange={this.handleChangePassword}
        ></input>
        <button
          style={{ marginBottom: -10, height: 30, width: 30 }}
          onClick={this.passwordToggle}
        />
        <br />
        <button
          onClick={() =>
            this.props.onLogin(this.state.username, this.state.password)
          }
        >
          Log In
        </button>

        <button
          onClick={() =>
            this.props.onSignup(this.state.username, this.state.password)
          }
        >
          Sign Up
        </button>
      </div>
    )
  }
}

export default Login
