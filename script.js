const display = document.getElementById("display");

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const add10Btn = document.getElementById("add10");
const add60Btn = document.getElementById("add60");

let totalSeconds = 5 * 60;
let timer = null;
let isRunning = false;


// 화면 표시
function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  display.textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


// 입력값으로 시간 설정
function setTimeFromInputs() {
  const minutes = Math.max(0, Number(minutesInput.value) || 0);
  const seconds = Math.min(59, Math.max(0, Number(secondsInput.value) || 0));

  totalSeconds = minutes * 60 + seconds;

  updateDisplay();
}


// 타이머 시작
function startTimer() {
  if (isRunning) return;

  if (totalSeconds <= 0) {
    setTimeFromInputs();
  }

  if (totalSeconds <= 0) return;

  isRunning = true;

  timer = setInterval(() => {
    totalSeconds--;

    updateDisplay();

    if (totalSeconds <= 0) {
      stopTimer();
      totalSeconds = 0;
      updateDisplay();

      alert("시간이 끝났습니다!");
    }
  }, 1000);
}


// 타이머 정지
function stopTimer() {
  clearInterval(timer);
  timer = null;
  isRunning = false;
}


// 일시정지
function pauseTimer() {
  stopTimer();
}


// 리셋
function resetTimer() {
  stopTimer();
  setTimeFromInputs();
}


// 시간 추가
function addTime(seconds) {
  totalSeconds += seconds;
  updateDisplay();

  // 현재 시간도 입력창에 반영
  minutesInput.value = Math.floor(totalSeconds / 60);
  secondsInput.value = totalSeconds % 60;
}


// 이벤트
startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

add10Btn.addEventListener("click", () => {
  addTime(10);
});

add60Btn.addEventListener("click", () => {
  addTime(60);
});

minutesInput.addEventListener("change", setTimeFromInputs);
secondsInput.addEventListener("change", setTimeFromInputs);


// 처음 실행
updateDisplay();
