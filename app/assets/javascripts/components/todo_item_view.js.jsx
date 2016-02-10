var TodoItemView = React.createClass ({

  render: function () {
    return (
      <div>
        <div>
          { "Title: " + this.props.todo.title }
        </div>
        <div>
          { "Body: " + this.props.todo.body }
        </div>
        <div>
          { "Pomodoros: " + this.props.todo.pomodoros }
        </div>
        <button onClick={ this.props.handleEdit }>Edit</button>
        <button onClick={ this.handleDestroy }>Delete Todo</button>
      </div>
    );
  }

});
