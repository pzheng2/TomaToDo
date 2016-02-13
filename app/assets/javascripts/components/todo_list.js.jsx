var TodoList = React.createClass({

  render: function () {

    return (
      <ul className="todo-list">
        {
          this.props.todos.map(function (todo) {
            if (todo.id === this.props.active) {
              return <li key={ todo.id }><div className="active" onClick={ this.props.activateTodo } id={ todo.id }>{ todo.title }</div></li>;
            } else {
              return <li key={ todo.id }><div onClick={ this.props.activateTodo } id={ todo.id }>{ todo.title }</div></li>;
            }
          }.bind(this))
        }
      </ul>
    );
  }


});
