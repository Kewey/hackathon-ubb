import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './index.css';
import App from './App';
import Chat from './chat/index';
import Soundbox from './soundbox/index';
import Login from './auth/index';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <FirebaseContext.Provider value={new BDD()} >
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/chat" component={Chat} />
      <Route path="/soundbox" component={Soundbox} />
      <Route path="/login" component={Login} />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
