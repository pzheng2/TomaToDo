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

  createTodo: function (e) {
    e.preventDefault();
    this.setState({ newTodo: true });
  },

  activateTodo: function (e) {
    e.preventDefault();
    var activeTodo = this.state.todos.find(function (todo) { return todo.id === parseInt(e.currentTarget.id); });
    this.setState({ activeTodo: activeTodo });
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
    var newTodo, activeTodoDetailView, view, emptyMain, activeTodoId;
    if (this.state.newTodo)
      newTodo = <TodoForm cancelNewTodo={ this.cancelNewTodo } currentUser={ this.state.currentUser }/>;

    if (this.state.activeTodo)
      activeTodoDetailView = <TodoDetailView todo={ this.state.activeTodo } />;

    if (!(newTodo || activeTodoDetailView))
      emptyMain = "Create or select a to-do to see stuff.";

    if (this.state.activeTodo) {
      activeTodoId = this.state.activeTodo.id;
    }

    if (this.state.currentUser && this.state.currentUser.username) {
      view = (
        <div className="sidebar-main">
          <Sidebar handleCreate={ this.handleCreate } username={ this.state.currentUser.username } todos={ this.state.todos } activateTodo={ this.activateTodo } activeTodoId={ activeTodoId } />
          <div className="hand-drawn main">
            { newTodo }
            { activeTodoDetailView }
            { emptyMain }
          </div>
        </div>
      );
    } else {

      if (this.state.signUp) {
        view = (
          <div className="login-body">
            <UserForm/>
            <button className="back-to-login" onClick={ this.cancelSignUp }>Back to Login</button>
          </div>
        );

      } else {

        view = (
          <div className="login-body">
            <div className="login-inputs group">
              <SessionForm/>
            </div>
            <button className="sign-up" onClick={ this.signUp }>Sign Up</button>
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
