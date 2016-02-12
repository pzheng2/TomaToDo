var View = React.createClass ({

  getInitialState: function () {
    return { todos: TodoStore.all(), newTodo: false };
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
    var activeTodo;
    if (this.state.activeTodo) {
      activeTodo = TodoStore.getTodo(this.state.activeTodo.id);
    }
    this.setState({ activeTodo: activeTodo, todos: TodoStore.all() });
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

  handleCreate: function () {
    this.setState({ newTodo: true });
  },

  cancelNewTodo: function () {
    this.setState({ newTodo: false });
  },

  render: function () {
    var active, newTodo;
    if (this.state.activeTodo) {
      active = <TodoDetailView todo={ this.state.activeTodo } />;
    }

    if (this.state.newTodo) {
      newTodo = <TodoForm cancelNewTodo={ this.cancelNewTodo } currentUser={ this.state.currentUser }/>;
    }

    var view;
    if (this.state.currentUser && this.state.currentUser.username) {
      var activeTodo = null;
      if (this.state.activeTodo) {
        activeTodo = this.state.activeTodo.id;
      }
      view = (
        <div>
          <div className="sidebar">
            <div className="stuff-in-sidebar">
              <div>{ "logged in as: " + this.state.currentUser.username }</div>
              <button onClick={ this.logout }>Log out</button>
              <TodoList active={ activeTodo } todos={ this.state.todos } activateTodo={ this.activateTodo }/>
              <button onClick={ this.handleCreate }>Create Todo</button>
            </div>
          </div>
          <div className="main">
            { newTodo }
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
          <div className="login-body">
            <div className="login-inputs group">
              <SessionForm/>
              <button className="sign-up" onClick={ this.signUp }>Sign Up</button>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="view group">
        { view }
      </div>

    );
  }

});
