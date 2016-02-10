var Timer = React.createClass({

  getInitialState: function () {
    return { duration: this.props.duration, timeElapsed: 0, start: this.props.start, pause: false };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 100);
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
  },

  tick: function () {
    var timeElapsed = (new Date() - this.state.start);
    this.setState({ timeElapsed: timeElapsed });
  },

  timerUp: function () {
    var updatedTodo = this.props.todo;
    updatedTodo.pomodoros -= 1;
    TodoStore.update(updatedTodo);
  },

  pause: function () {
    clearInterval(this.timer);
    this.setState({ pause: true });
  },

  resume: function () {
    this.setState({ pause: false, start: new Date().getTime() - this.state.timeElapsed });
    this.timer = setInterval(this.tick, 100);
  },

  render: function () {
    var elapsed = Math.round(this.state.timeElapsed / 60);
    var seconds = 59 - parseInt((elapsed / 10) % 60);
    var minutes = this.state.duration - 1 - parseInt((elapsed / 10) / 60);
    // var minutes = 1 - parseInt((elapsed / 10) / 60);

    if (seconds.toString().length < 2) {
      seconds = "0" + seconds.toString();
    }

    if (minutes.toString().length < 2) {
      minutes = "0" + minutes.toString();
    }

    if (minutes < 0) {
      minutes = "00";
      seconds = "00";
    }

    var pause;
    if (this.state.pause) {
      pause = <button onClick={ this.resume }>Resume</button>;
    } else {
      pause = <button onClick={ this.pause }>Pause</button>;
    }
    return (
      <div>
        <div className="time-left">
          { minutes + ":" + seconds }
        </div>
        { pause }

      </div>
    );
  }

});
