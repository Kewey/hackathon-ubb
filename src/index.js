import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './index.css';
import Home from './home/home';
import Chat from './home/chatbox';
import Soundbox from './soundbox/index';
import Login from './auth/login';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Chat} />
      <Route path="/soundbox" component={Soundbox} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
