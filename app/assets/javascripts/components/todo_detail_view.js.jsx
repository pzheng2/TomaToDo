var TodoDetailView = React.createClass ({
  getInitialState: function () {
    var state = this.props.todo;
    state.edit = false;
    state.timer = false;
    return state;
  },

  componentWillReceiveProps: function(newProps) {
    var state = newProps.todo;
    state.edit = false;
    this.setState(state);
  },

  handleDestroy: function (e) {
    TodoStore.destroy(this.props.todo.id);
  },

  handleEdit: function (e) {
    this.setState({ edit: !this.state.edit });
  },

  startTimer: function () {
    this.setState({ timer: true, duration: 25 });
  },

  stopTimer: function () {
    this.setState({ timer: false });
  },

  startBreak: function () {
    this.stopTimer();
    this.setState({ timer: true, duration: 5 });
  },

  render: function () {
    var fields = this.state.edit ?
    (
      <div>
        <TodoEdit todo={ this.props.todo }/>
        <button onClick={ this.handleEdit }>Cancel Edit</button>
      </div>
    ) : <TodoItemView handleEdit={ this.handleEdit } todo={ this.props.todo }/>;

    var timer = this.state.timer ?
    (
      <div>
        <Timer startBreak={ this.startBreak } todo={ this.props.todo } start={ Date.now() } duration={ this.state.duration }/>
        <button onClick={ this.stopTimer }>Stop Timer</button>
      </div>
    ) : <button onClick={ this.startTimer }>Start Timer</button>;

    return (
      <div>
        { fields }
        { timer }
      </div>
    );
  }

});
