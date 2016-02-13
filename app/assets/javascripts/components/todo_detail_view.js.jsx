var TodoDetailView = React.createClass ({

  getInitialState: function () {
    var state = this.props.todo;
    state.edit = false;
    state.timer = false;
    state.pomodoroCount = 0;
    return state;
  },

  componentWillReceiveProps: function (newProps) {
    var state = newProps.todo;
    state.edit = false;
    if (this.state.id !== newProps.todo.id) {
      state.timer = false;
    }
    this.setState(state);
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todoChanged);
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todoChanged);
  },

  todoChanged: function () {
    var updatedTodo = TodoStore.getTodo(this.state.id);
    this.setState(updatedTodo);
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

  receivePomodoroCount: function (pomodoroCount) {
    this.setState({ pomodoroCount: pomodoroCount });
  },

  render: function () {
    var fields, timer;

    if (this.state.edit) {
      fields = (
        <div>
          <TodoEdit todo={ this.props.todo }/>
          <button onClick={ this.handleEdit }>Cancel Edit</button>
        </div>
      );
    } else {
      fields = <TodoItemView handleEdit={ this.handleEdit } todo={ this.props.todo }/>;
    }

    if (this.state.timer) {
      timer = (
        <div>
          <Timer
            savePomodoroCount={ this.receivePomodoroCount }
            pomodoroCount={ this.state.pomodoroCount }
            todo={ this.props.todo }
            start={ Date.now() }
          />
          <button onClick={ this.stopTimer }>Stop Timer</button>
        </div>
      );
    } else {

      if (parseInt(this.state.pomodoros) === 0) {
        timer = <p>Finished Todo!</p>;
      } else {
        timer = <button onClick={ this.startTimer }>Start Timer</button>;
      }
    }

    return (
      <div className="todo-detail-view">
        { fields }
        { timer }
      </div>
    );
  }

});
