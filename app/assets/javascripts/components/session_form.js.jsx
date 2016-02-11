var SessionForm = React.createClass({

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
    console.log(currentUser);
    TodoStore.fetch();
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors.responseJSON.errors });
  },

  render: function () {
    return (
      <form className="login-body group" onSubmit={ this.submit }>
        <ul>
          <li>{ this.state.errors }</li>

          <li>
            <input className="input" type="text" name="username" placeholder="Username" />
          </li>

          <li>
            <input className="input" type="password" name="password" placeholder="Password" />
          </li>

          <li><button>Log In!</button></li>
        </ul>
      </form>
    );
  },

});
