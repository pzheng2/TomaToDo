var TodoForm = React.createClass({
  getInitialState: function() {
    return { title: "", body: "", pomodoros: 0, newTodo: false };
  },

  updateTitle: function(e) {
    this.setState({ title: e.currentTarget.value });
  },

  updateBody: function(e) {
    this.setState({ body: e.currentTarget.value });
  },

  updatePomodoros: function(e) {
    this.setState({ pomodoros: e.currentTarget.value });
  },

  handleSubmit: function(e) {
    TodoStore.create({
      title: this.state.title,
      body: this.state.body,
      pomodoros: this.state.pomodoros,
      user_id: this.props.currentUser.id
    });

    this.setState({ title: "", body: "", pomodoros: 0, newTodo: false });
  },

  handleCreate: function () {
    this.setState({ newTodo: true });
  },

  handleCancel: function () {
    this.setState({ newTodo: false });
  },

  render: function () {
    var newTodo;
    if (this.state.newTodo) {
      newTodo = (
        <div>
          <h3>Add new todo</h3>
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
          <button onClick={ this.handleCancel }>Cancel</button>
        </div>
      );
    } else {
      newTodo =(
        <button onClick={ this.handleCreate }>Create Todo</button>
      );

    }
    return (
      <div>
        { newTodo }
      </div>
    );
  }
});
