// Write task and add to task dropbar menu
// MAY NEED TO CLEAR / DELETE TASKS USR DOESN'T NEED;
const selectEle = document.querySelector('#form-select-task');

if (!localStorage.getItem('tasks')) {
  localStorage.setItem('tasks', JSON.stringify([]));
};

if (!localStorage.getItem('workTime')) {
  localStorage.setItem('workTime', 0);
};

document.querySelector('#addTaskBtn').addEventListener('click', function () {
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  tasks.push(document.querySelector('#input-task').value);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  tasks = JSON.parse(localStorage.getItem('tasks'));

  tasks.map(task => {
    const option = document.createElement('option');
    option.value = task
    option.text = task
    selectEle.appendChild(option)
  });
});

// SELECT POMODORO TIME

const selectWorkTime = document.querySelector('#pomodoroTimeSelect');
const pomodoroTime = [20, 25, 30, 35, 40, 45]

//MAPS or LOOPS THROUGH EACH ITEM OF OUR pomodoroTime ARRAY & RENDERS DROPDOWN OPTIONS
pomodoroTime.map(time => {
  const optionEle = document.createElement('option');
  //set displayText to time => converts time to string
  optionEle.text = String(time);
  // sets value as actual number
  optionEle.value = time;
  //appends the new option on the bottom of the select element on HTML 
  selectWorkTime.appendChild(optionEle);
});

// Everytime the select element changes via option
selectWorkTime.addEventListener('change', function () {
  //set our browser's localStorage key of workTime to the select value
  localStorage.setItem('workTime', this.value);
})

// select pomodoro short break

const selectShortBreak = document.querySelector('#pomodoroShortBreak'); //////
const pomodoroShortBreak = [5, 5, 5]

pomodoroShortBreak.map(time => {
  //creates a new option element
  const optionEle2 = document.createElement('option');
  //assisns new option ele with text & value
  optionEle2.text = String(time);
  optionEle2.value = time;
  //appends under the select element of id => #pomodoroShortBreak
  selectShortBreak.appendChild(optionEle2); //////
});


selectShortBreak.addEventListener('change', function () {
  localStorage.setItem('shortBreak', this.value);
});

// select pomodoro long break

const selectLongBreak = document.querySelector('#pomodoroLongBreak'); //////
const pomodoroLongBreak = [15]

pomodoroLongBreak.map(time => {
  const optionEle3 = document.createElement('option');
  optionEle3.text = String(time);
  optionEle3.value = time;
  selectLongBreak.appendChild(optionEle3); //////
});

selectLongBreak.addEventListener('change', function () {
  localStorage.setItem('longBreak', this.value);
});



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