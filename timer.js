let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // this timer() function is to take in the number of seconds we wish for the timer to be in
  clearInterval(countdown); // to clear the existing timers

  const now = Date.now(); // the current timestamp in milliseconds
  const then = now + seconds * 1000; // to plus the number of seconds that we wish to run the timer for in milliseconds
  displayTimeLeft(seconds); //to display immediately at every single second
  displayEndTime(then);

  countdown = setInterval(() => {
    //to store the interval in its own variable
    const secondsLeft = Math.round((then - Date.now()) / 1000); //to get the amount of time left
    if (secondsLeft < 0) {
      // to check if we should stop it
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft); //to display immediately at every single second again
  }, 1000); //run it every second
}

function displayTimeLeft(seconds) {
  //this displayTimeLeft() function is to display the amount of time left
  const minutes = Math.floor(seconds / 60); //to get the whole minutes without remainders
  const remainderSeconds = seconds % 60; //to get the left seconds
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  //this displayEndTime() function is to display the end time
  const end = new Date(timestamp); // to turn timestamp into Date
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour; //to turn 24-hours into 12-hours
  const minutes = end.getMinutes();
  endTime.textContent = `Come back at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

function startTimer() {
  //this startTimer() function is to start the timer
  const seconds = parseInt(this.dataset.time); //to get the real number
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault(); //to stop it from reloading the page
  const mins = this.minutes.value; //to get the input value
  console.log(mins); //to display the value
  timer(mins * 60); //pass mins to the function timer() in seconds
  this.reset();
});
