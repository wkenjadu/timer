```javascript
const display = document.getElementById("display");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const add10Btn = document.getElementById("add10");
const add60Btn = document.getElementById("add60");

const timerContainer = document.querySelector(".timer-container");

let totalSeconds = 5 * 60;
let timer = null;
let isRunning = false;


// 타이머 표시
function updateDisplay() {

  const hours = Math.floor(totalSeconds / 3600);

  const minutes =
    Math.floor((totalSeconds % 3600) / 60);

  const seconds =
    totalSeconds % 60;

  display.textContent =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}


// 입력한 시간 가져오기
function getInputTime() {

  const hours =
    Math.max(0, Number(hoursInput.value) || 0);

  const minutes =
    Math.min(
      59,
      Math.max(0, Number(minutesInput.value) || 0)
    );

  const seconds =
    Math.min(
      59,
      Math.max(0, Number(secondsInput.value) || 0)
    );

  return hours * 3600 + minutes * 60 + seconds;
}


// 입력한 시간 적용
function setTimeFromInputs() {

  if (isRunning) return;

  totalSeconds = getInputTime();

  timerContainer.classList.remove("finished");

  updateDisplay();
}


// 입력창에 현재 시간 표시
function updateInputs() {

  hoursInput.value =
    Math.floor(totalSeconds / 3600);

  minutesInput.value =
    Math.floor((totalSeconds % 3600) / 60);

  secondsInput.value =
    totalSeconds % 60;
}


// 타이머 시작
function startTimer() {

  if (isRunning) return;

  if (totalSeconds <= 0) {
    totalSeconds = getInputTime();
  }

  if (totalSeconds <= 0) return;

  timerContainer.classList.remove("finished");

  isRunning = true;

  timer = setInterval(() => {

    totalSeconds--;

    updateDisplay();

    if (totalSeconds <= 0) {

      totalSeconds = 0;

      stopTimer();

      updateDisplay();

      timerContainer.classList.add("finished");

      alert("⏰ 시간이 끝났습니다!");
    }

  }, 1000);
}


// 타이머 정지
function stopTimer() {

  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }

  isRunning = false;
}


// 일시정지
function pauseTimer() {
  stopTimer();
}


// 리셋
function resetTimer() {

  stopTimer();

  timerContainer.classList.remove("finished");

  totalSeconds = getInputTime();

  updateDisplay();
}


// 10초 / 1분 추가
function addTime(seconds) {

  totalSeconds += seconds;

  timerContainer.classList.remove("finished");

  updateDisplay();

  updateInputs();
}


// 버튼 이벤트

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

add10Btn.addEventListener("click", () => {
  addTime(10);
});

add60Btn.addEventListener("click", () => {
  addTime(60);
});


// 입력 이벤트

hoursInput.addEventListener(
  "change",
  setTimeFromInputs
);

minutesInput.addEventListener(
  "change",
  setTimeFromInputs
);

secondsInput.addEventListener(
  "change",
  setTimeFromInputs
);


// 처음 실행

updateDisplay();
```
