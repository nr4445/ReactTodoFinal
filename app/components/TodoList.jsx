var React = require('react');
var {connect} = require('react-redux');

import Todo from 'Todo';
//var Todo = require('Todo');
var TodoAPI = require('TodoAPI');


export var TodoList = React.createClass({
  render: function () {
    var {todos, showCompleted, searchText} = this.props;
    var renderTodos = () => {
      var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
      if(filteredTodos.length === 0) {
        return (
          <p className="container__message">Nothing to Do</p>
        );
      }

      return filteredTodos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>// spread out operator
        );
      });
    };
    return (
      <div>
        {renderTodos()}
      </div>
    )
  }
});

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
