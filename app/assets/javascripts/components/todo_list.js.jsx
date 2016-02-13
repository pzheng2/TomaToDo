var TodoList = React.createClass ({

  render: function () {
    return (
      <ul className="todo-list">
        {
          this.props.todos.map(function (todo) {
            var className = "";
            if (todo.id === this.props.activeTodoId)
              className += "active";
            if (parseInt(todo.pomodoros) === 0)
              className += " completed";

            return <li key={ todo.id }><div className={ className } onClick={ this.props.activateTodo } id={ todo.id }>{ todo.title }</div></li>;
          }.bind(this))
        }
      </ul>
    );
  }

});
