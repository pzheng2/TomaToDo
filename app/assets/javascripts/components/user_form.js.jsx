var UserForm = React.createClass({

  getInitialState: function () {
    return { username: "", password: "", errors: null };
  },

  submit: function (e) {
    e.preventDefault();
    UsersApiUtil.createUser({
      username: this.state.username,
      password: this.state.password
    }, this.successCallback, this.errorCallback);
  },

  errorCallback: function (errors) {
    this.setState({ errors: errors });
  },

  render: function () {
    var errors = [];
    if (this.state.errors) {
      for (var i = 0; i < this.state.errors.responseJSON.length; i++) {
        errors.push(this.state.errors.responseJSON[i]);
      }
    }

    return (
      <form onSubmit={ this.submit }>
        <ul>
          <li>
            <div className="errors">
              {
                errors.map(function (error) {
                  return <div>{ error }</div>;
                })
              }
            </div>
          </li>

          <li>
            <input type="text" name="username" placeholder="Username" valueLink={ this.linkState("username") } />
          </li>

          <li>
            <input type="password" name="password" placeholder="Password" valueLink={ this.linkState("password") } />
          </li>

          <li><button>Sign Up</button></li>
        </ul>
      </form>
    );
  }
});
