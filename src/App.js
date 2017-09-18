import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import $ from 'jquery';

class App extends Component {
  renderAccCreation() {
    ReactDOM.render(<createAcc />, document.getElementById('root'));
  }
  render() {
    return (
      <div className="app">
        <div className="createAcc">
          <h1>welcome to cchange!</h1>
          <form>
            <h3>username</h3>
            <input type="text" id="userTBox" name="username" placeholder="username"/>
        
            <h3>password</h3>
            <input type="password" id="passTBox" name="password" placeholder="password"/>

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
  
class createAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        username: "",
        password: ""
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  handleUsername(e) {
    this.setState({username: e.target.value});
  }

  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("username email and password");
    console.log(this.state.username + " " + this.state.email + " " + this.state.password);
    //var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    //xmlhttp.open("POST", "http://api.cchange.ga/auth.create");
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.send(JSON.stringify({ name: this.state.username, email: this.state.email, password: this.state.password}));
    console.log('Attempting to send');
    $.ajax({
      type: "POST",
      url: "//api.cchange.ga/auth.create",
      contentType: 'application/json',
      data: JSON.stringify({
        'name': this.state.username,
        'email': this.state.email,
        'password': this.state.password
      }),
      success: function (data, status) {
        console.log(data);
      }
      
    });
  }
  renderLogin() {
    ReactDOM.render(<App />, document.getElementById('root'));
  }
  render() {
    return (
      <div className='acc'>
        <div className="login">
            <h1>welcome to cchange</h1>
            <form id="accCreateForm" onSubmit={this.handleSubmit}>
                <h3>username</h3>
                <input type="text" id="nameBox" name = "username" placeholder="username" value={this.state.username} onChange={this.handleUsername} />
                <h3>email</h3>
                <input type="text" id="emailBox" name = "email" placeholder="email" value={this.state.email} onChange={this.handleEmail} />
                <h3>password</h3>
                <input type="password" id="passBox" name = "password" placeholder="password" value={this.state.password} onChange={this.handlePassword} />
                <br/>
                <input type="submit" id="btnCreateAcc" value="submit"/>
            </form>
            <a id="linkToLogin" href="#" onClick={this.renderLogin}>Already have an account?</a>
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

export default createAcc;
