const display = document.getElementById("display");

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const add10Btn = document.getElementById("add10");
const add60Btn = document.getElementById("add60");

const timerContainer =
  document.querySelector(".timer-container");

let totalSeconds = 5 * 60;

let timer = null;

let isRunning = false;


// =========================
// 화면 표시
// =========================

function updateDisplay() {

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  display.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}


// =========================
// 입력값 가져오기
// =========================

function getInputTime() {

  let minutes =
    Number(minutesInput.value) || 0;

  let seconds =
    Number(secondsInput.value) || 0;

  minutes = Math.max(0, minutes);

  seconds =
    Math.min(59, Math.max(0, seconds));

  return minutes * 60 + seconds;
}


// =========================
// 입력창 업데이트
// =========================

function updateInputs() {

  minutesInput.value =
    Math.floor(totalSeconds / 60);

  secondsInput.value =
    totalSeconds % 60;
}


// =========================
// 입력값 적용
// =========================

function setTimeFromInputs() {

  if (isRunning) {
    return;
  }

  totalSeconds =
    getInputTime();

  timerContainer.classList.remove(
    "finished"
  );

  updateDisplay();
}


// =========================
// 시작
// =========================

function startTimer() {

  if (isRunning) {
    return;
  }

  if (totalSeconds <= 0) {

    totalSeconds =
      getInputTime();

  }

  if (totalSeconds <= 0) {
    return;
  }

  timerContainer.classList.remove(
    "finished"
  );

  isRunning = true;

  timer = setInterval(() => {

    totalSeconds--;

    updateDisplay();

    if (totalSeconds <= 0) {

      totalSeconds = 0;

      stopTimer();

      updateDisplay();

      timerContainer.classList.add(
        "finished"
      );

      alert("시간이 끝났습니다!");

    }

  }, 1000);
}


// =========================
// 정지
// =========================

function stopTimer() {

  if (timer !== null) {

    clearInterval(timer);

    timer = null;
  }

  isRunning = false;
}


// =========================
// 일시정지
// =========================

function pauseTimer() {

  stopTimer();
}


// =========================
// 리셋
// =========================

function resetTimer() {

  stopTimer();

  timerContainer.classList.remove(
    "finished"
  );

  totalSeconds =
    getInputTime();

  updateDisplay();
}


// =========================
// 시간 추가
// =========================

function addTime(seconds) {

  totalSeconds += seconds;

  timerContainer.classList.remove(
    "finished"
  );

  updateDisplay();

  updateInputs();
}


// =========================
// 버튼
// =========================

startBtn.addEventListener(
  "click",
  startTimer
);

pauseBtn.addEventListener(
  "click",
  pauseTimer
);

resetBtn.addEventListener(
  "click",
  resetTimer
);

add10Btn.addEventListener(
  "click",
  () => addTime(10)
);

add60Btn.addEventListener(
  "click",
  () => addTime(60)
);


// =========================
// 입력
// =========================

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
