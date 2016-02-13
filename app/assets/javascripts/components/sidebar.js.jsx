var Sidebar = React.createClass ({

  getInitialState: function () {
    return {};
  },

  logout: function () {
    CurrentUserStore.logout();
    this.props.redirectToLogin();
  },

  render: function () {

    return (
      <div className="sidebar group">
        <div className="stuff-in-sidebar group">
          <div className="current-user-status">
            <h1 className="username">{ this.props.username + "\'s To-Do List" }</h1>
            <button onClick={ this.logout }>Log out</button>
            <div className="to-dos">To-Dos</div>
          </div>
          <TodoList activeTodoId={ this.props.activeTodoId } todos={ this.props.todos } activateTodo={ this.props.activateTodo }/>
          <button onClick={ this.props.handleCreate }>Create Todo</button>
        </div>
      </div>
    );
  }
});
