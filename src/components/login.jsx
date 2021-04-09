import React, { Component } from "react";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", showPassword: false, text: "" };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  componentDidMount() {
    this.listenToServer();
  }
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
  };
  listenToServer = () => {
    this.props.socket.on("signup", (res) => {
      if (res.text === "sign up success") {
        this.setState({
          signupString: (
            <div>
              <textarea
                style={{
                  marginTop: 10,
                  resize: "none",
                  border: "none",
                  width: "35%",
                }}
                readOnly
                type="text"
                ref={(textarea) => (this.textArea = textarea)}
                value={"!verify " + res.number}
              />

              <button
                style={{ position: "absolute", width: 30, height: 30 }}
                onClick={this.copyToClipboard}
              >
                Copy
              </button>
              <p>paste this in chat</p>
            </div>
          ),
        });
      } else {
        this.setState({ signupString: "name already exists" });
      }
    });
    this.props.socket.on("login", (res) => {
      console.log(res);
      if (res !== null) {
        if (res === "wrong password") {
          this.setState({ signupString: "wrong password buddy" });
        } else if (res.status === "verified") {
          let data = {
            user: res.username,
            currency: res.currency,
            bgColor: "rgb(47,79,79)",
            position: "left",
          };
          if (res.pref.hasOwnProperty("bgColor")) {
            data.bgColor = res.pref.bgColor;
            data.position = res.pref.position;
          }
          this.props.onLoginSuccess(data);
        } else {
          this.setState({
            signupString:
              "user not verified, sign up and use code to verify your account",
          });
        }
      } else {
        this.setState({ signupString: "user not found, just sign up" });
      }
    });
    this.props.socket.on("forgotpassword", (res) => {
      this.setState({ signupString: res });
    });
  };
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleType(event) {
    event.preventDefault();
  }
  passwordToggle = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  passwordState = () => {
    if (this.state.showPassword) {
      return "text";
    } else return "password";
  };
  handleForgotPassword = () => {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({
        signupString:
          "Please enter your username and new password, then click again",
      });
    } else {
      let data = {
        username: this.state.username,
        password: this.state.password,
      };
      this.props.socket.emit("forgotpassword", data);
    }
  };

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };
  handleLogin = () => {
    console.log("ok");
    let data = { username: this.state.username, password: this.state.password };
    this.props.socket.emit("login", data);
  };
  handleSignup = () => {
    let number = Math.random() * (100000000000000000 - 0);
    let data = {
      username: this.state.username,
      password: this.state.password,
      status: "pending",
      string: number,
      pref: [],
    };
    this.props.socket.emit("signup", data);
  };
  state = { signupString: "" };
  render() {
    if (this.props.user === "") {
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

          <button
            style={{ height: 30, width: 30 }}
            onClick={this.passwordToggle}
          >
            👁
          </button>
          <br />
          <button onClick={this.handleLogin}>Log In</button>
          <button onClick={this.handleSignup}>Sign Up</button>
          <button onClick={this.handleForgotPassword}>Forgot Password</button>
          {this.state.signupString}
        </div>
      );
    }
    return null;
  }
}

export default Login;
