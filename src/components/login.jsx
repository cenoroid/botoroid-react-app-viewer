import React, { Component } from "react"
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "", password: "", showPassword: false, text: "" }
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
  handleForgotPassword = () => {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        text: "Please enter your username and new password, then click again",
      })
    } else {
      this.props.onForgotPassword(this.state.username, this.state.password)
      this.setState({
        text: "",
      })
    }
  }
  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.props.onLogin(this.state.username, this.state.password)
    }
  }
  state = {}
  render() {
    return (
      <div>
        <input
          style={{ width: 228 }}
          value={this.state.username}
          onChange={this.handleChangeUsername}
          placeholder="twitch username"
        ></input>
        <br />

        <input
          onKeyDown={(e) => this.handleEnter(e)}
          style={{ width: 228 }}
          type={this.passwordState()}
          value={this.state.password}
          onChange={this.handleChangePassword}
          placeholder="any password"
        ></input>

        <button style={{ height: 30, width: 30 }} onClick={this.passwordToggle}>
          👁
        </button>
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
        <button onClick={this.handleForgotPassword}>Forgot Password</button>
        <p>{this.state.text}</p>
      </div>
    )
  }
}

export default Login
