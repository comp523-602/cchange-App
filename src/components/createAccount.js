import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Profile from './profile';
import Login from './login';
import $ from 'jquery'

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

      //if the user is not a charity
      //and has not pasted a token
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
          //set cookies for login
          success: function (data, status) {
            console.log(data);
            document.cookie = "token=" + data.token;
            document.cookie = "uname=" + data.user.name;
            ReactDOM.render(<Profile/>, document.getElementById("root"));
            },
          error: function(data, status) {
            alert(data.responseJSON.message);
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
          //set cookies for login
          success: function (data, status) {
            console.log(data);
            document.cookie = "token=" + data.token;
            document.cookie = "uname=" + data.user.name;
            document.cookie = "cname=" + data.charity.name;
            document.cookie = "cdesc=" + "Enter a description for " + data.charity.name;
            ReactDOM.render(<Profile/>, document.getElementById("root"));
            },
          error: function(data, status) {
            alert(data.responseJSON.message);            
          }
        });
      }
    }

    renderLogin() {
      ReactDOM.render(<Login />, document.getElementById('root'));
    }
    
    render() {
      return (
        <div className='acc'>
          <div className="login">
              <h1>welcome to cchange</h1>
              <form id="accCreateForm" onSubmit={this.handleSubmit}>
                  <h3>username</h3>
                  <input type="text" id="nameBox" name = "username" placeholder="Can only contain letters and numbers" 
                    value={this.state.username} onChange={this.handleUsername} />
                  <h3>email</h3>
                  <input type="text" id="emailBox" name = "email" placeholder="Must be a valid email" 
                    value={this.state.email} onChange={this.handleEmail} />
                  <h3>password</h3>
                  <input type="password" id="passBox" name = "password" placeholder="At least one number and >= 8 characters" 
                    value={this.state.password} onChange={this.handlePassword} />
                  <br/>
                  <h3>Are you a charity?</h3>
                  <input type="text" id="charityTokenBox" name = "charityToken" placeholder="Charity Token" 
                    value={this.state.charityToken} onChange={this.handleCharityToken} />
                  <br/>        
                  <input type="text" id="charityNameBox" name = "charityName" placeholder="Charity Name" 
                    value={this.state.charityName} onChange={this.handleCharityName} />
                  <br/>        
                  <input type="submit" id="btnCreateAcc" value="submit"/>
              </form>
              <a id="linkToLogin" href="#" onClick={this.renderLogin}>Already have an account?</a>
          </div>
        </div>
      );
    }
}