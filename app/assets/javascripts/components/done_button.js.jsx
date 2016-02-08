var DoneButton = React.createClass ({

  handleDone: function () {
    TodoStore.toggleDone(this.props.todo.id);
  },

  render: function () {
    var text = this.props.todo.done ? "Undo" : "Done";

    return (
      <button onClick={this.handleDone}>
        {text}
      </button>

    );
  }

});
