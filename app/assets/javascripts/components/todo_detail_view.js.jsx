var TodoDetailView = React.createClass ({
  getInitialState: function () {
    var state = this.props.todo;
    state.edit = false;
    state.timer = false;
    state.duration = 25;
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
    this.setState({edit: !this.state.edit});
  },

  updateTitle: function (e) {
    this.setState({ title: e.currentTarget.value });
  },

  updateBody: function (e) {
    this.setState({ body: e.currentTarget.value });
  },

  updatePomodoros: function (e) {
    this.setState({ pomodoros: e.currentTarget.value });
  },

  handleSubmit: function (e) {
    TodoStore.update({ id: this.state.id, title: this.state.title, body: this.state.body, pomodoros: this.state.pomodoros });
  },

  startTimer: function () {
    this.setState({ timer: true });
  },

  stopTimer: function () {
    this.setState({ timer: false });
  },

  render: function () {
    var fields, timer;

    if (this.state.edit) {
      fields = (
          <div>
            <label>Title
              <input onChange={ this.updateTitle } value={ this.state.title } type="text" />
            </label><br/>
            <label>Body
              <input onChange={ this.updateBody } value={ this.state.body } type="textarea" />
            </label><br/>
            <label>Pomodoros
              <input onChange={ this.updatePomodoros } value={ this.state.pomodoros } type="number" />
            </label>
            <button onClick={ this.handleSubmit }>Submit</button>
          </div>
        );

    } else {

      fields = (
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
            <button onClick={ this.handleEdit }>Edit</button>
          </div>
      );
    }

    if (this.state.timer) {
      timer = (
        <div>
          <Timer todo={ this.props.todo } start={ Date.now() } duration={ this.state.duration }/>
          <button onClick={ this.stopTimer }> Stop Timer</button>
        </div>
      );
    } else {
      timer = (
        <button onClick={ this.startTimer }>Start Timer</button>
      );
    }

    return (
      <div>
        { fields }
        { timer }
        <button onClick={ this.handleDestroy }>Delete Todo</button>
      </div>
    );
  }

});
