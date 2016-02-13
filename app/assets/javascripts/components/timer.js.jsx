var Timer = React.createClass({

  getInitialState: function () {
    this.pomodoroLength = 25;
    this.breakLength = 5;
    this.longerBreakLength = 30;

    return {
      timeElapsed: 0,
      start: this.props.start,
      pause: false,
      break: false,
      duration: this.pomodoroLength,
      pomodoroCount: this.props.pomodoroCount
    };
  },

  componentDidMount: function () {
    this.timer = setInterval(this.tick, 100);
  },

  componentWillUnmount: function () {
    this.props.savePomodoroCount(this.state.pomodoroCount);
    clearInterval(this.timer);
  },

  tick: function () {
    var durationInMilliseconds = this.state.duration * 60000;
    if (this.state.timeElapsed >= durationInMilliseconds) {
      this.timerFinished();
    }
    this.setState({ timeElapsed: Date.now() - this.state.start });
  },

  timerFinished: function () {
    var pomodoroCount = this.state.pomodoroCount, newDuration;
    if (this.state.duration === this.pomodoroLength) {
      TodoStore.update({
        id: this.props.todo.id,
        title: this.props.todo.title,
        body: this.props.todo.body,
        pomodoros: this.props.todo.pomodoros - 1
      });

      pomodoroCount = pomodoroCount + 1;
    }

    if ((this.state.pomodoroCount % 4) === 3 && !this.state.break) {
      newDuration = this.longerBreakLength;
    } else if (this.state.break) {
      newDuration = this.pomodoroLength;
    } else {
      newDuration = this.breakLength;
    }

    this.setState({
      timeElapsed: 0,
      start: Date.now(),
      break: !this.state.break,
      duration: newDuration,
      pomodoroCount: pomodoroCount });
  },

  pause: function () {
    clearInterval(this.timer);
    this.setState({ pause: true });
  },

  resume: function () {
    this.setState({ pause: false, start: Date.now() - this.state.timeElapsed });
    this.timer = setInterval(this.tick, 100);
  },

  closeModal: function (e) {
    e.currentTarget.parentElement.parentElement.className = "modal";
  },

  render: function () {
    var totalSeconds = Math.floor(this.state.timeElapsed / 1000);
    var minutesPassed = Math.ceil(totalSeconds / 60);
    var secondsPassed = totalSeconds % 60;
    var minutesLeft = this.state.duration - minutesPassed;
    var secondsLeft = (60 - secondsPassed) % 60;

    if (secondsLeft.toString().length < 2)
      secondsLeft = "0" + secondsLeft.toString();

    if (minutesLeft.toString().length < 2)
      minutesLeft = "0" + minutesLeft.toString();

    if (minutesLeft < 0)
      minutesLeft = "00";

    var pause, paused, skipBreak, modal;

    if (this.state.pause) {
      pause = <button onClick={ this.resume }>Resume</button>;
      paused = "Paused";
    } else {
      pause = <button onClick={ this.pause }>Pause</button>;
    }

    if (this.state.break) {
      skipBreak = <button onClick={ this.timerFinished }>Skip Break</button>;
      modal = (
        <section id="modal" className="modal is-active">
          <article className="modal-content">
            <span className="modal-close js-hide-modal" onClick={ this.closeModal }>x</span>
            <h1>Break Time</h1>
          </article>
          <div className="modal-screen js-hide-modal"></div>
        </section>
      );
    }

    return (
      <div>
        { modal }
        { paused }
        <div className="consecutive-pomodoros">
          { "Pomodoros completed: " + this.state.pomodoroCount }
        </div>
        <div className="time-left">
          { minutesLeft + ":" + secondsLeft }
        </div>
        { pause }
        { skipBreak }

      </div>
    );
  }

});
