const countdownForm = document.getElementById("CountdownForm");
const inputContainer = document.getElementById("input-container");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElement = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeElInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";

let countdownValue = Date;
let countdownActive;

let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// set Date Input Min with todays date

const today = new Date().toISOString().split("T")[0];

dateEl.setAttribute("min", today);
// populate countdown
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   hide input
    inputContainer.hidden = true;

    //   if countdown is ended show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeEl.hidden = false;

      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    } else {
      // populate countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minutes}`;
      timeElement[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// take values from input
function updateCountdown(event) {
  event.preventDefault();
  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };

  localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  //  check for valid date
  if (countdownDate === "") {
    alert("please select a date for countdown.");
  } else {
    //   get number version of current date
    countdownValue = new Date(countdownDate).getTime();

    updateDOM();
  }
}

// updateCountdown();

// reset value
function reset() {
  // hide countdown ,show
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  //   stop the countdown
  clearInterval(countdownActive);
  //   reset value
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// event Listener

countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// countdownForm.addEventListener("submit", updateCountdown);

// onload check local storage
restorePreviousCountdown();
