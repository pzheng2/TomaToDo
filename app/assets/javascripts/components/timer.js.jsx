var Timer = React.createClass({

  getInitialState: function () {
    this.pomodoroLength = 25;
    this.breakLength = 5;
    return { timeElapsed: 0, start: this.props.start, pause: false, break: false, duration: this.pomodoroLength };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 100);
  },

  componentWillUnmount: function () {
    clearInterval(this.timer);
  },

  tick: function () {
    var durationInMilliseconds = this.state.duration * 60000;
    // console.log(this.state.timeElapsed, durationInMilliseconds);
    if (this.state.timeElapsed >= durationInMilliseconds) {
      this.timerFinished();
    }
    this.setState({ timeElapsed: Date.now() - this.state.start });
  },

  timerFinished: function () {
    TodoStore.update({ id: this.props.todo.id, title: this.props.todo.title, body: this.props.todo.body, pomodoros: this.props.todo.pomodoros - 1 });
    var newDuration = this.state.break ? this.pomodoroLength : this.breakLength;
    this.setState({ timeElapsed: 0, start: Date.now(), break: !this.state.break, duration: newDuration });
  },

  pause: function () {
    clearInterval(this.timer);
    this.setState({ pause: true });
  },

  resume: function () {
    this.setState({ pause: false, start: Date.now() - this.state.timeElapsed });
    this.timer = setInterval(this.tick, 100);
  },

  render: function () {
    var totalSeconds = Math.floor(this.state.timeElapsed / 1000);
    var minutesPassed = Math.ceil(totalSeconds / 60);
    var secondsPassed = totalSeconds % 60;

    var minutesLeft = this.state.duration - minutesPassed;
    var secondsLeft = (60 - secondsPassed) % 60;

    if (secondsLeft.toString().length < 2) {
      secondsLeft = "0" + secondsLeft.toString();
    }

    if (minutesLeft.toString().length < 2) {
      minutesLeft = "0" + minutesLeft.toString();
    }

    if (minutesLeft < 0) {
      minutesLeft = "00";
      // secondsLeft = "00";
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
          { minutesLeft + ":" + secondsLeft }
        </div>
        { pause }

      </div>
    );
  }

});
