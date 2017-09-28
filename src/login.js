import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import CreateAccount from './createAccount';
import Profile from './profile';
import $ from 'jquery';

export default class Login extends Component {
    constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: ""
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  renderAccCreation() {
    ReactDOM.render(<CreateAccount />, document.getElementById('root'));
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("email and password");
    console.log(this.state.email + " " + this.state.password);
    console.log('Attempting to send');

    $.ajax({
      type: "POST",
      url: "//api.cchange.ga/user.login",
      contentType: 'application/json',
      data: JSON.stringify({
        'email': this.state.email,
        'password': this.state.password,
      }),

      success: function (data, status) {
        console.log(data);
        document.cookie = "token=" + data.token;
        document.cookie = "uname=" + data.user.name;

        //if charity information is returned from AJAX response
        if(data.charity != null) {
          document.cookie = "cname=" + data.charity.name;
          document.cookie = "cdesc=" + data.charity.description;
        }
        ReactDOM.render(<Profile/>, document.getElementById("root"));
      }

    });
  }

  handleEmail(e) {
    this.setState({email: e.target.value});
  }
  handlePassword(e) {
    this.setState({password: e.target.value});
  }

  render() {
    return (
      <div className="app">
        <div className="login">
          <h1>welcome to cchange!</h1>
          <form onSubmit={this.handleLogin}>
            <h3>email</h3>
            <input type="text" id="emailTBox" name="email" placeholder="email"
              value={this.state.email} onChange={this.handleEmail}/>

            <h3>password</h3>
            <input type="password" id="passTBox" name="password" placeholder="password"
              value={this.state.password} onChange={this.handlePassword}/>

            <input type="submit" value = "login"/>
          </form>
          <a id="linkToAccCreation" href="#" onClick={this.renderAccCreation}>Don't have an account?</a>
        </div>
        <div className="info">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br/><br/>sed do eiusmod tempor incididunt ut <br/>
          labore et dolore magna aliqua. Ut enim ad minim veniam, <br/><br/>quis nostrud exercitation ullamco laboris nisi<br/><br/>
          ut aliquip ex ea commodo consequat. Duis aute irure dolor in <br/><br/>reprehenderit in voluptate velit esse cillum <br/><br/>
          dolore eu fugiat nulla pariatur. <br/>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui <br/><br/>officia deserunt mollit anim id est laborum
          </p>
        </div>
      </div>
    );
  }
}
