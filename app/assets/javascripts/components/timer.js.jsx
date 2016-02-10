var Timer = React.createClass({

  getInitialState: function () {
    return { timeElapsed: 0, start: this.props.start, pause: false };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 100);
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
  },

  tick: function () {
    var durationInMilliseconds = this.props.duration * 60000;
    console.log(this.state.timeElapsed, durationInMilliseconds);
    if (this.state.timeElapsed >= durationInMilliseconds) {
      this.timerUp();
      clearInterval(this.timer);
    }
    this.setState({ timeElapsed: new Date() - this.state.start });
  },

  timerUp: function () {
    TodoStore.update({ id: this.props.todo.id, title: this.props.todo.title, body: this.props.todo.body, pomodoros: this.props.todo.pomodoros - 1 });
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
    var seconds = (60 - Math.ceil(this.state.timeElapsed / 1000)) % 60;
    var minutes = this.props.duration - Math.ceil(this.state.timeElapsed / 60000);

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
