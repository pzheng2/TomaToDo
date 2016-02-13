var Sidebar = React.createClass ({
  getInitialState: function () {
    return {};
  },

  logout: function () {
    CurrentUserStore.logout();
  },

  render: function () {
    var activeTodo = null;

    if (this.props.activeTodo) {
      activeTodo = this.props.activeTodo.id;
    }

    return (
      <div className="sidebar group">
        <div className="stuff-in-sidebar group">
          <div className="current-user-status">
            <h1 className="username">{ "  " + this.props.username }</h1>
            <button onClick={ this.logout }>Log out</button>
            <div className="to-dos">To-Dos</div>
          </div>
          <TodoList active={ activeTodo } todos={ this.props.todos } activateTodo={ this.props.activateTodo }/>
          <button onClick={ this.props.handleCreate }>Create Todo</button>
        </div>
      </div>
    );
  }
});
