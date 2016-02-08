var View = React.createClass ({

  getInitialState: function () {
    return { todos: TodoStore.all() };
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  todosChanged: function () {
    this.setState({ activeTodo: TodoStore.all()[0], todos: TodoStore.all() });
  },

  activateTodo: function (e) {
    e.preventDefault();
    var activeTodo = this.state.todos.find(function (todo) { return todo.title === e.currentTarget.innerHTML; });
    this.setState({ activeTodo: activeTodo });
  },

  render: function () {
    var active;
    if (this.state.activeTodo) {
      active = <ActiveItem todo={this.state.activeTodo} />;
    }

    return (
      <div>
        <div className="sidebar">
        <TodoForm />
        <ul>
          {
            this.state.todos.map(function (todo) {
              return <li onClick={this.activateTodo} key={todo.id}>{todo.title}</li>;
            }.bind(this))
          }
        </ul>
        </div>
        <div className="main">
          {active}
        </div>
      </div>
    );
  }

});
