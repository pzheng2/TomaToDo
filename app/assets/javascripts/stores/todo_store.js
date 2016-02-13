(function (root) {
  "use strict";
  var TodoStore = root.TodoStore = {};
  var _todos = [];
  var _callbacks = [];

  TodoStore.changed = function () {
    _callbacks.forEach(function (callback) {
      callback();
    });
  };

  TodoStore.addChangedHandler = function (callback) {
    _callbacks.push(callback);
  };

  TodoStore.removeChangedHandler = function (callback) {
    _callbacks = _callbacks.filter(function (cb) {
      return cb !== callback;
    });
  };

  TodoStore.all = function () {
    return _todos.slice();
  };

  TodoStore.fetch = function () {
    $.ajax({
      url: "/api/todos",
      method: "GET",
      dataType: "JSON",
      success: function (todos) {
        _todos = todos;
        TodoStore.changed();
      }
    });
  };

  TodoStore.create = function (todo, successCallBack, errorCallback) {
    $.ajax({
      url: "api/todos",
      method: "POST",
      dataType: "json",
      data: {todo: todo},
      success: function (response) {
        _todos.push(response);
        TodoStore.changed();
        successCallBack && successCallBack();
      },
      error: function (errors) {
        errorCallback && errorCallback(errors);
      }
    });
  };

  TodoStore.find = function (id) {
    return _todos.findIndex(function (todo) { return todo.id === id; });
  };

  TodoStore.getTodo = function (id) {
    return _todos[TodoStore.find(id)];
  };

  TodoStore.destroy = function (id) {
    if (TodoStore.find(id) !== -1) {
      $.ajax({
        url: "api/todos/" + id,
        method: "DELETE",
        dataType: "json",
        success: function () {
          _todos.splice(TodoStore.find(id), 1);
          TodoStore.changed();
        }
      });
    }
  };

  TodoStore.update = function (todo, errorCallback) {
    $.ajax({
      url: "api/todos/" + todo.id,
      method: "PATCH",
      dataType: "json",
      data: {todo: todo},
      success: function () {
        _todos[TodoStore.find(todo.id)] = todo;
        TodoStore.changed();
      },
      error: function (errors) {
        errorCallback && errorCallback(errors);
      }
    });
  };

})(this);
