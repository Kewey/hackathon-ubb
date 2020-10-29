import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './index.css';
import Chat from './chat/chat';
import Soundbox from './soundbox/index';
import Login from './auth/login';
import reportWebVitals from './reportWebVitals';
import {auth, signInWithGoogle} from './server/firebase'


const PrivateRoute = ({component: Component, user, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          user === true ?
            <Component {...props} signInWithGoogle={signInWithGoogle} user={user} />
          : <Redirect to={{ pathname: "/login", state: {from: props.location} }} />
      )} />
  );
};

function PublicRoute({ component: Component, user, signInWithGoogle, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => <Component {...props} signInWithGoogle={signInWithGoogle} user={user} />
      }
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
    }
  }
  
  render() {
    return (
      <div className="mobile">
        <header className="top-app row">
        <a href="/">
          <svg width="4" height="7" viewBox="0 0 4 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.8226 5.57478L1.46554 3.28879L3.8226 1.00279C3.87884 0.948241 3.92346 0.883484 3.95389 0.812215C3.98433 0.740946 4 0.66456 4 0.587419C4 0.510278 3.98433 0.433893 3.95389 0.362624C3.92346 0.291355 3.87884 0.226598 3.8226 0.172051C3.76636 0.117504 3.69959 0.0742353 3.6261 0.0447148C3.55262 0.0151942 3.47386 -5.74744e-10 3.39432 0C3.31478 5.74746e-10 3.23602 0.0151942 3.16254 0.0447148C3.08905 0.0742353 3.02228 0.117504 2.96604 0.172051L0.177657 2.87636C0.121341 2.93087 0.0766611 2.99561 0.0461764 3.06689C0.0156916 3.13816 0 3.21457 0 3.29173C0 3.36889 0.0156916 3.4453 0.0461764 3.51657C0.0766611 3.58785 0.121341 3.65259 0.177657 3.7071L2.96604 6.41141C3.20296 6.64119 3.58568 6.64119 3.8226 6.41141C4.05345 6.18163 4.05952 5.80456 3.8226 5.57478Z"/>
          </svg>
          retour</a>
          {
            this.user ? 
            <img onClick={() => auth.signOut()} src={this.state.user.photoURL} className="logout" height="30" alt="Deconnexion"/>
            : null
          }
        </header>
        <Switch>
          <PublicRoute user={this.state.user} signInWithGoogle={signInWithGoogle} path="/login" component={Login} />
          <PrivateRoute user={this.state.user} component={Chat} path="/chat" exact />
          <PrivateRoute user={this.state.user} path="/soundbox" component={Soundbox} />
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }
};

export default App;

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
