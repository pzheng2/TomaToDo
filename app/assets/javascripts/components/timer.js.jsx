var Timer = React.createClass({

  getInitialState: function () {
    return { duration: this.props.duration, timeElapsed: 0 };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 50);
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
  },

  tick: function () {
    this.setState({ elapsed: new Date() - this.props.start });
  },

  render: function () {
    var elapsed = Math.round(this.state.elapsed / 60);
    var seconds = 59 - parseInt((elapsed / 10) % 60);
    var minutes = this.state.duration - 1 - parseInt((elapsed / 10) / 60);

    if (seconds.toString().length < 2) {
      seconds = "0" + seconds.toString();
    }

    if (minutes.toString().length < 2) {
      minutes = "0" + minutes.toString();
    }

    return (
      <div>
        <div className="time-left">
          { minutes + ":" + seconds }
        </div>

      </div>
    );
  }

});
