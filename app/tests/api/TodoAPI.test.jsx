var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', ()=> {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('filterTods', () => {
    var todos = [{
      id: 1,
      text: 'some text',
      completed: true
    },{
      id: 2,
      text: 'other text',
      completed: false
    },{
      id: 3,
      text: 'unknown text',
      completed: true
    }];

    it('should return items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return items if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, '', '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');

      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should return all todos if search text is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, 'true', '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should filter todos by serach text', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, 'true', 'unknown');
      expect(filteredTodos.length).toBe(1);
    });

  });

});
