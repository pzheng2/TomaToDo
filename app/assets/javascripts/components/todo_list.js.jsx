var TodoList = React.createClass({

  render: function () {

    return (
      <ul className="todo-list">
        <li>Your Todos</li>
        {
          this.props.todos.map(function (todo) {
            if (todo.id === this.props.active) {
              return <li className="active" onClick={ this.props.activateTodo } key={ todo.id }>{ todo.title }</li>;
            } else {
              return <li onClick={ this.props.activateTodo } key={ todo.id }>{ todo.title }</li>;
            }
          }.bind(this))
        }
      </ul>
    );
  }


});
