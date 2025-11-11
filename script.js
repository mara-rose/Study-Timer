let intervalId;
let TimerData = JSON.parse(localStorage.getItem('data')) || { leftTime: 1800, isPaused: false, note: 'you\'re building momentum, don\'t stop now !' }//30minute *60
const timeDisplay = document.querySelector('.js-timer');
const noteElement = document.querySelector('.js-note');
const pauseElement = document.querySelector('.js-pause-button');
const timeRealElement = document.querySelector('.js-time-real');

document.querySelector('.js-click-start')
  .addEventListener('click', () => {
    toggleTime();
  });

document.querySelector('.js-click-reset')
  .addEventListener('click', () => {
    resetTimer();
  })

function realTime() {
  const timeNow = new Date();
  let hour = timeNow.getHours();
  let minute = timeNow.getMinutes();
  let second = timeNow.getSeconds();
  let PmAm = (hour >= 12) ? 'PM' : 'AM'
  hour = hour % 12 || 12;
  timeRealElement.innerHTML = `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)} : ${('0' + second).slice(-2)} ${PmAm}`;
}
realTime();
setInterval(realTime, 1000);

function updateDisplay() {
  let minutes = Math.floor(TimerData.leftTime / 60);
  let seconds = TimerData.leftTime % 60;
  timeDisplay.innerHTML = `${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`;
  localStorage.setItem('data', JSON.stringify(TimerData));
}

function toggleTime() {
  if (!TimerData.isPaused) {
    intervalId = setInterval(function () {
      if (TimerData.leftTime > 0) {
        TimerData.leftTime--;
        updateDisplay();
        TimerData.note = 'you\'re building momentum, don\'t stop now !';
        noteElement.innerHTML = TimerData.note;
      } else {
        clearInterval(intervalId);
        TimerData.note = 'Time to take a Break !!'
        noteElement.innerHTML = TimerData.note;
        TimerData.isPaused = true;
        pauseElement.innerHTML = 'Resume';
        localStorage.setItem('data', JSON.stringify(TimerData));
      }
    }, 1000);
    pauseElement.innerText = 'Pause'
    TimerData.isPaused = true;
  }
  else {
    clearInterval(intervalId);
    pauseElement.innerText = 'Resume';
    TimerData.isPaused = false;
  }
  localStorage.setItem('data', JSON.stringify(TimerData));
}

function resetTimer() {
  TimerData.leftTime = 1800;
  clearInterval(intervalId);
  TimerData.isPaused = false;
  pauseElement.innerText = 'Start';
  TimerData.note = 'Let\'s Go ';
  noteElement.innerHTML = TimerData.note;
  updateDisplay();
  localStorage.setItem('data', JSON.stringify(TimerData));
}

pauseElement.innerText = TimerData.isPaused ? 'Resume' : 'Start';
noteElement.innerHTML = TimerData.note;
updateDisplay();


if (!TimerData.isPaused && TimerData.leftTime > 0) {
  toggleTime();
}