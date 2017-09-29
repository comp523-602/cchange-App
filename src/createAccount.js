import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Profile from './profile';
import $ from 'jquery';

export default class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            charityToken: "",
            charityName: "",
            charityDescription: ""
      };

        this.handleUsername = this.handleUsername.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCharityToken = this.handleCharityToken.bind(this);
        this.handleCharityName = this.handleCharityName.bind(this);    
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

    handleCharityToken(e) {
      this.setState({charityToken: e.target.value});
    }

    handleCharityName(e) {
      this.setState({charityName: e.target.value});
    }

    handleCharityDescription(e) {
      this.setState({charityDescription: e.target.value});
    }

    handleSubmit(e) {
      e.preventDefault();
      console.log("username email and password");
      console.log(this.state.username + " " + this.state.email + " " + this.state.password);
      console.log('Attempting to send');

      if(this.state.charityToken.length == 0) {
        $.ajax({
          type: "POST",
          url: "//api.cchange.ga/user.create",
          contentType: 'application/json',
          data: JSON.stringify({
            'name': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
          }),
          success: function (data, status) {
            console.log(data);
            document.cookie = "token=" + data.token;
            document.cookie = "uname=" + data.user.name;
            ReactDOM.render(<Profile/>, document.getElementById("root"));
            }
        });
      }
      
      else {
        $.ajax({
          type: "POST",
          url: "//api.cchange.ga/user.create.charity",
          contentType: 'application/json',
          data: JSON.stringify({
            'name': this.state.username,
            'email': this.state.email,
            'password': this.state.password,
            "charityToken": this.state.charityToken,
            "charityName": this.state.charityName,
          }),
          success: function (data, status) {
            console.log(data);
            document.cookie = "token=" + data.token;
            document.cookie = "uname=" + data.user.name;
            document.cookie = "cname=" + data.charity.name;
            ReactDOM.render(<Profile/>, document.getElementById("root"));
            }
        });
      }
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
                  <input type="text" id="nameBox" name = "username" placeholder="username" 
                    value={this.state.username} onChange={this.handleUsername} />
                  <h3>email</h3>
                  <input type="text" id="emailBox" name = "email" placeholder="email" 
                    value={this.state.email} onChange={this.handleEmail} />
                  <h3>password</h3>
                  <input type="password" id="passBox" name = "password" placeholder="password" 
                    value={this.state.password} onChange={this.handlePassword} />
                  <br/>
                  <h3>charity token</h3>
                  <input type="text" id="charityTokenBox" name = "charityToken" placeholder="Optional Charity Token" 
                    value={this.state.charityToken} onChange={this.handleCharityToken} />
                  <br/>        
                  <input type="text" id="charityNameBox" name = "charityName" placeholder="Charity Name" 
                    value={this.state.charityName} onChange={this.handleCharityName} />
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