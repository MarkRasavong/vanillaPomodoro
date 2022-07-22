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

//Timer Logic

// function that executes every seconds
// total no. of minutes
// convert minutes to seconds & store in a global varible
// Decrement seconds by 1 for each second
// check if seconds reaches zero if true alert user & clear timer


const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");

// countdown;
let n = 10; //DEMO OF Selected time

function countDown() {
  //Decrement whatever user selects
  n--;

  //RECURSIVE FUNCTION ***
  if (n > 0) {
    setTimeout(countDown, 1000); // calls countDown fn every second
  }

  console.log(n);
  document.getElementById('timer').innerHTML = n;
}

startButton.addEventListener("click", () => {
  countDown();
});

resetButton.addEventListener("click", () => {

});



