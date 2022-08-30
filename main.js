'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = String(d.getUTCHours()).padStart(2);
    const m = String(d.getMinutes()).padStart(2);
    const s = String(d.getSeconds()).padStart(2);
    const ms = String(d.getMilliseconds()).padStart(1).slice(0, 1);
    timer.textContent = `${h}:${m}:${s}: ${ms}`;


    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateStay() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }


  setButtonStateStay();//ボタン操作制御開始

  start.addEventListener('click', () => {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    setButtonStateStay();
    timer.textContent = ' 0: 0: 0: 0'
    elapsedTime = 0;
  });

}
