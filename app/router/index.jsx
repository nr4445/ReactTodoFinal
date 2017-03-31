import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

//Middleware for required login routes
//these are gonna the routes that require the user to be logged in to vissit the page
//this is a middleware function
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {//if no one is logged in
    replace('/');
  }
  next();
};

var redirectIfLoggedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/todos');
  }
  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={redirectIfLoggedIn}/>
    </Route>
  </Router>
);
