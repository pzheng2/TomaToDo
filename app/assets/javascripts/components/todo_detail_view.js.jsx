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
    this.setState({ timer: true });
  },

  stopTimer: function () {
    this.setState({ timer: false });
  },

  render: function () {
    var fields = this.state.edit ?
    (
      <div>
        <TodoEdit todo={ this.props.todo }/>
        <button onClick={ this.handleEdit }>Cancel Edit</button>
      </div>
    ) : <TodoItemView handleEdit={ this.handleEdit } todo={ this.props.todo }/>;

    var timer;
    if (this.state.timer) {
      timer = (
        <div>
          <Timer todo={ this.props.todo } start={ Date.now() }/>
          <button onClick={ this.stopTimer }>Stop Timer</button>
        </div>
      );

    } else {
      
      if (this.state.pomodoros === 0) {
        timer = <p>Finished Pomodoro!</p>;
      } else {
        timer = <button onClick={ this.startTimer }>Start Timer</button>;
      }
    }

    return (
      <div>
        { fields }
        { timer }
      </div>
    );
  }

});
