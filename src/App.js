import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import CreateAccount from './components/createAccount';
import Login from './components/login';
import { observable, action, computed } from 'mobx';

class App extends Component {
  render() {
    return (
    //render homepage
    <Router>
      <div className="homepage">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/createaccount">Create Account</Link></li>
        </ul>

        <Route path="/login" component={Login}/>
        <Route path="/createaccount" component={CreateAccount}/>
      </div>
    </Router>
    )
  }
  /**
   * Renders the login component (login.js)
   */
  goToLogin() {
    ReactDOM.render(<Login/>, document.getElementById("root"));
  }

  /**
   * Renders the create account component (createAccount.js)
   */
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
