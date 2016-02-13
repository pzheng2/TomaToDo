var UserForm = React.createClass ({

  getInitialState: function () {
    return { username: "", password: "", errors: null };
  },

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    CurrentUserStore.createUser(credentials, this.errorCallback);
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors.responseJSON });
  },

  render: function () {

    return (
      <form className="login-inputs group" onSubmit={ this.submit }>
        <h1 className="website-name">
          <div className="toma">Toma</div>
          <div className="to">To</div>
          <div className="do">Do</div>
        </h1>

        <h3>Sign Up</h3>
        <ul>
          { this.state.errors && this.state.errors.map(function (error) {
              return <div>{ error }</div>;
            })
          }
          <li><input className="input" type="text" name="username" placeholder="Username" /></li>
          <li><input className="input" type="password" name="password" placeholder="Password" /></li>
          <li><button className="red button">Sign Up</button></li>
        </ul>
      </form>
    );
  }
});
