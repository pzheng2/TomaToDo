var SessionForm = React.createClass ({

  getInitialState: function () {
    return {};
  },

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    CurrentUserStore.login(
      credentials,
      this.successfulLogin,
      this.errorCallback
    );
  },

  successfulLogin: function (currentUser) {
    TodoStore.fetch();
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors.responseJSON.errors });
  },

  render: function () {
    return (
      <form className="login-inputs group" onSubmit={ this.submit }>
        <h1 className="website-name">
          <div className="toma">Toma</div>
          <div className="to">To</div>
          <div className="do">Do</div>
        </h1>

        <h3>Log In</h3>

        <ul>
          <li>{ this.state.errors }</li>
          <li><input className="input" type="text" name="username" placeholder="Username" /></li>
          <li><input className="input" type="password" name="password" placeholder="Password" /></li>
          <li><button className="red button">Log In!</button></li>
        </ul>
      </form>
    );
  },

});
