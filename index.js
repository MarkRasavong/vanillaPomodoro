// Write task and add to task dropbar menu
// MAY NEED TO CLEAR / DELETE TASKS USR DOESN'T NEED

$(function () {
  $("#addTaskBtn").click(function () {
    const tasks = [];
    tasks.push($(".form-control").val())
    localStorage.setItem("tasks", JSON.stringify(tasks))

    JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(task => {
      $('#form-select-task').append(`
      <option value=${task}>
        ${task}
      </option>
      `)
    })
  })
});

// let paused = true;
// let minutes;
// let timerDate;
// let remainingTime = 0;



// const setPomoTime = (minutes) => {
//   paused = true;
//   document.getElementById("minutes").innerHTML = "00";
//   document.getElementById("seconds").innerHTML = "00";
//   timerDate = new Date(new Date().getTime() + minutes * 60000);
//   remainingTime = 0;
//   paused = true;
//   document.getElementById("play").innerHTML = "Play";
// }

// const reset = () => {
//   document.getElementById("reset").reset();
  
// }

// const startPomo = (action) => {
//   paused = !paused;
//   document.getElementById("play").innerHTML = paused ? "Play" : "Pause";

//   const updateTimer = () => {
//     if (!paused) {
//       const date = new Date().getTime() - remainingTime;
//       const timeLeft = timerDate - date;
//       document.getElementById("minutes").innerHTML = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//       document.getElementById("seconds").innerHTML = Math.floor((timeLeft % (1000 * 60)) / 1000);
//     }else {
//       remainingTime += 300
//     }
      
    
//   }
//   setInterval(updateTimer, 1000);

// }

// setPomoTime(25);


const pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,  
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
    this.resetVariables(25, 0, true);    
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
    const audio = new Audio();
    audio.src = "./public/sound_trim.mp3";
    setInterval(function () {
      audio.play();      
    }, 100);

  }
}

window.onload = function () {
  pomodoro.init();
};
