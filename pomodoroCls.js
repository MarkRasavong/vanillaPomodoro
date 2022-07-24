class Pomodoro {
  constructor(workMinutes, longBreakMins, shortBreakMins, started) {
    this.workMinutes = workMinutes;
    this.longBreakMins = longBreakMins;
    this.shortBreakMins = shortBreakMins;
    this.started = started;
    this.interval = null;
    this.minutesDom = null;
    this.secondsDom = null;
    this.timeUpAudio = new Audio("./public/sound_trim.mp3");
  }

  init() {
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.interval = setInterval(() => {
      this.intervalCallback.apply(this);
    }, 1000)
  }

  startPlay() {
    this.resetVariables(this.workMinutes, true);
  }

  startShortBreak() {
    this.resetVariables(this.shortBreakMins, true);
  }

  startLongBreak() {
    this.resetVariables(this.workMinutes, true);
  }

  resetTimer() {
    this.resetVariables(this.workMinutes, false);
    this.updateDom();
  }

  resetVariables(minutes, started) {
    this.minutes = minutes;
    this.started = started;
  }

  toDoubleDigit(num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  }

  updateDom() {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  }

  intervalCallback() {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        setTimeout(() => {
          this.stopTimeComplete();
        }, 5000)
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  }

  timerComplete() {
    this.timeUpAudio.play()
  }

  stopTimeComplete() {
    this.timeUpAudio.pause();
    this.timeUpAudio.currentTime = 0;
  }
}


const model = new Pomodoro(15, 10, 5, false)
model.init()

//OLD CODE

const pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  timeUpAudio: new Audio("./public/sound_trim.mp3"),

  init: function () {
    let self = this;
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);

    document.querySelector('#play').onclick = function () {
      self.startPlay.apply(self);
    };
    document.querySelector('#shortBreak').onclick = function () {
      self.startShortBreak.apply(self);
    };
    document.querySelector('#longBreak').onclick = function () {
      self.startLongBreak.apply(self);
    };
    document.querySelector('#reset').onclick = function () {
      self.resetTimer.apply(self);
    };
  },

  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },

  startPlay: function () {
    this.resetVariables(15, 0, true);
  },

  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },

  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },

  resetTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },

  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },

  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
  },

  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        setTimeout(() => {
          this.stopTimeComplete();
        }, 5000)
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },

  timerComplete: function () {
    this.timeUpAudio.play()
  },

  stopTimeComplete: function () {
    this.timeUpAudio.pause();
    this.timeUpAudio.currentTime = 0;
  }
}

window.onload = function () {
  pomodoro.init();
};