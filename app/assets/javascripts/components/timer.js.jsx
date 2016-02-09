var Timer = React.createClass({

  getInitialState: function () {
    return { duration: this.props.duration, timeElapsed: 0 };
  },

  render: function () {
    return (
      <div>
        <div className="minutes">
          {}
        </div>

        <div className="seconds">

        </div>
      </div>
    );
  }

});
