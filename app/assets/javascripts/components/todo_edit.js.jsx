var TodoEdit = React.createClass ({

  getInitialState: function () {
    return { title: this.props.todo.title, body: this.props.todo.body, pomodoros: this.props.todo.pomodoros };
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
    TodoStore.update({ id: this.props.todo.id, title: this.state.title, body: this.state.body, pomodoros: this.state.pomodoros });
  },

  render: function () {
    return (
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
  }

});
