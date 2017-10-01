import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import CreateAccount from './components/createAccount';
import Login from './components/login';
import {Router, Link, IndexRoute, Route, browserHistory} from 'react-router';
import { observable, action, computed } from 'mobx';

class App extends Component {
  render() {
    return (
    //render homepage
    <div className="homepage">
      <button onClick={this.goToLogin}>Login</button>
      <button onClick={this.goToAccountCreation}>Create account</button>
    </div>
    )
  }
  
  goToLogin() {
    ReactDOM.render(<Login/>, document.getElementById("root"));
  }

  goToAccountCreation() {
    ReactDOM.render(<CreateAccount/>, document.getElementById("root"));
  }
  /*
  @observable view = 'home';
  
  @computed getCurrentPath() {
    return '/' + this.view + '/';
  }

  @observable doRoute() {
    //look at Tarheel reader for routing
    //use Store to store states like token, user, and the like
    
  }
  */
}


export default App;
