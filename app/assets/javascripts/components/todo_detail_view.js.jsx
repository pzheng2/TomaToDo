var TodoDetailView = React.createClass ({
  getInitialState: function () {
    return {};
  },

  componentWillUnmount: function () {
  },

  componentDidMount: function () {
  },

  handleDestroy: function (e) {
    TodoStore.destroy(this.props.todo.id);
  },

  handleEdit: function(e) {
    debugger;
  },

  render: function () {

    return (
      <div>
        <div>
          {"Title: " + this.props.todo.title}
        </div>
        <div>
          {"Body: " + this.props.todo.body}
        </div>
        <div>
          {"Pomodoros: " + this.props.todo.pomodoros}
        </div>
        <button onClick={this.handleDestroy}>Delete Todo</button>
        <button onClick={this.handleEdit}>Edit</button>
      </div>
    );
  }

});
