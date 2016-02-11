var View = React.createClass ({

  getInitialState: function () {
    return { todos: TodoStore.all() };
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
    CurrentUserStore.addChangedHandler(this.userChanged);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
    CurrentUserStore.removeChangedHandler(this.userChanged);
  },

  todosChanged: function () {
    this.setState({ activeTodo: TodoStore.all()[0], todos: TodoStore.all() });
  },

  userChanged: function () {
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  activateTodo: function (e) {
    e.preventDefault();
    var activeTodo = this.state.todos.find(function (todo) { return todo.title === e.currentTarget.innerHTML; });
    this.setState({ activeTodo: activeTodo });
  },

  createTodo: function (e) {
    e.preventDefault();
    this.setState({ newTodo: "true" });
  },

  logout: function () {
    CurrentUserStore.logout();
  },

  signUp: function () {
    this.setState({ signUp: true });
  },

  cancelSignUp: function () {
    this.setState({ signUp: false });
  },

  render: function () {
    var active;
    if (this.state.activeTodo) {
      active = <ActiveItem todo={ this.state.activeTodo } />;
    }

    var view;
    if (this.state.currentUser && this.state.currentUser.username) {
      view = (
        <div>
          <div className="sidebar">
            <div>{ "You are currently logged in as: " + this.state.currentUser.username }</div>
            <button onClick={ this.logout }>Log out</button>
            <TodoList active={ this.state.activeTodo.id } todos={ this.state.todos } activateTodo={ this.activateTodo }/>
            <TodoForm currentUser={ this.state.currentUser }/>
          </div>
          <div className="main">
            { active }
          </div>
        </div>
      );
    } else {
      if (this.state.signUp) {
        view = (
          <div>
            <UserForm/>
            <button onClick={ this.cancelSignUp }>Back to Login</button>
          </div>
        );
      } else {
        view = (
          <div>
            <SessionForm/>
            <button onClick={ this.signUp }>Sign Up</button>
          </div>
        );
      }
    }

    return (
      <div className="view">
        { view }
      </div>

    );
  }

});
