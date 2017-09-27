import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import CreateAccount from './createAccount';
import Login from './login';
class App extends React.Component {
  render() {
    return (
    //render homepage
    <div className="homepage">
      <button onClick={this.goToLogin}>Login</button>
      <button onClick={this.goToAccountCreation}>Create account</button>
    </div>
    )
    //tarheel shared reader/17 on github
  }
  
  goToLogin() {
    ReactDOM.render(<Login/>, document.getElementById("root"));
  }

  goToAccountCreation() {
    ReactDOM.render(<CreateAccount/>, document.getElementById("root"));
  }
}

export default App;
