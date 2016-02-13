var TodoForm = React.createClass ({

  getInitialState: function () {
    return { title: "", body: "", pomodoros: 0, errors: null };
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
    TodoStore.create ({
      title: this.state.title,
      body: this.state.body,
      pomodoros: this.state.pomodoros,
      user_id: this.props.currentUser.id
    }, this.successCallBack, this.errorCallback);
  },

  successCallBack: function () {
    this.props.cancelNewTodo();
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors.responseJSON });
  },

  render: function () {
    return (
      <div className="todo-form">
        <h3>Add new todo</h3>
        { this.state.errors && this.state.errors.map(function (error) {
          return <div>{ error }</div>;
          })
        }
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
