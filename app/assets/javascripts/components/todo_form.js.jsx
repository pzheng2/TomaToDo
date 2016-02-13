var TodoForm = React.createClass({
  getInitialState: function() {
    return { title: "", body: "", pomodoros: 0 };
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

    this.setState({ title: "", body: "", pomodoros: 0 });
    this.props.cancelNewTodo();
  },

  render: function () {
    return (
      <div className="todo-form">
        <h3>Add new todo</h3>
        <ul className="todo-fields group">
          <li><label>Title:
            <input onChange={ this.updateTitle } value={ this.state.title } type="text" />
          </label></li>
          <li><label>Body:
            <input onChange={ this.updateBody } value={ this.state.body } type="textarea" />
          </label></li>
          <li><label>Pomodoros:
            <input onChange={ this.updatePomodoros } value={ this.state.pomodoros } type="number" />
          </label></li>
          <li><button onClick={ this.handleSubmit }>Submit</button>
          <button onClick={ this.props.cancelNewTodo }>Cancel</button></li>
        </ul>
      </div>
    );
  }
});
