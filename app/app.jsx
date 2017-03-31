var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');


var actions = require('actions');
var store = require('configureStore').configure();

import firebase from 'app/firebase/';
import router from 'app/router';


//populating data from local during first time laoding
// store.subscribe(() => {
//   var state = store.getState();
//
//   console.log('New state', state);
//
//   TodoAPI.setTodos(state.todos);
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

//this method fires each and every time auth status status chnages,
//like during login and Logout
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(actions.login(user.uid));
    //async action that fetches data from firebase during first time
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');//redirects to todos page
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');//brings to Login page
  }
});


//Load foundation library
//require('style!css!foundation-sites/dist/foundation.min.css')//to style these html we need embed the chain with style loader
//firup foundation
$(document).foundation();

//App css
require('!style!css!sass!applicationStyles')




//common DOM method
ReactDOM.render(
<Provider store={store}>
  {router}
</Provider>,
document.getElementById('app')
);
