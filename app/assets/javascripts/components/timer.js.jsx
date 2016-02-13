var Timer = React.createClass ({

  POMODORO_LENGTH: 25,
  BREAK_LENGTH: 5,
  LONGERBREAK_LENGTH: 30,
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,

  getInitialState: function () {
    return {
      timeElapsed: 0,
      start: this.props.start,
      pause: false,
      break: false,
      duration: this.POMODORO_LENGTH,
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
    var durationInMilliseconds = this.state.duration * this.MILLISECONDS_IN_SECOND * this.SECONDS_IN_MINUTE;
    if (this.state.timeElapsed >= durationInMilliseconds) {
      this.timerFinished();
    }
    this.setState({ timeElapsed: Date.now() - this.state.start });
  },

  timerFinished: function () {
    var pomodoroCount = this.state.pomodoroCount, newDuration;
    if (this.state.duration === this.POMODORO_LENGTH) {
      TodoStore.update({
        id: this.props.todo.id,
        title: this.props.todo.title,
        body: this.props.todo.body,
        pomodoros: this.props.todo.pomodoros - 1
      });

      pomodoroCount = pomodoroCount + 1;
    }

    if ((this.state.pomodoroCount % 4) === 3 && !this.state.break) {
      newDuration = this.LONGER_BREAK_LENGTH;
    } else if (this.state.break) {
      newDuration = this.POMODORO_LENGTH;
    } else {
      newDuration = this.BREAK_LENGTH;
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
    var totalSeconds = Math.floor(this.state.timeElapsed / this.MILLISECONDS_IN_SECOND);
    var minutesPassed = Math.ceil(totalSeconds / this.SECONDS_IN_MINUTE);
    var secondsPassed = totalSeconds % this.SECONDS_IN_MINUTE;
    var minutesLeft = this.state.duration - minutesPassed;
    var secondsLeft = (this.SECONDS_IN_MINUTE - secondsPassed) % this.SECONDS_IN_MINUTE;

    if (secondsLeft.toString().length < 2)
      secondsLeft = "0" + secondsLeft.toString();

    if (minutesLeft.toString().length < 2)
      minutesLeft = "0" + minutesLeft.toString();

    if (minutesLeft < 0)
      minutesLeft = "00";

    var pause, timerState = "", skipBreak, modal;

    if (this.state.pause) {
      pause = <button onClick={ this.resume }>Resume</button>;
      timerState = " paused";
    } else {
      pause = <button onClick={ this.pause }>Pause</button>;
      timerState = " playing";
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
        <div className="consecutive-pomodoros">
          { "Pomodoros completed: " + this.state.pomodoroCount }
        </div>
        <div className={ "timer" + timerState }>
          { minutesLeft + ":" + secondsLeft }
        </div>
        { pause }
        { skipBreak }
      </div>
    );
  }

});
