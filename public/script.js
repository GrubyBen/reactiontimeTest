const reactionButton = document.getElementById('reactionButton');
const resultDiv = document.getElementById('result');
const timer = document.getElementById('timer');

let startTime, endTime, timerTimeout;

reactionButton.addEventListener('click', () => {
  if (reactionButton.disabled) {
    resultDiv.textContent = 'Za szybki klik!';
    resetButton();
    return;
  }

  endTime = new Date().getTime();
  const reactionTime = (endTime - startTime) / 1000; 
  resultDiv.textContent = `Twój czas reakcji: ${reactionTime.toFixed(3)} sekundy`;

  fetch('/save-result', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reactionTime }),
  }).then(response => {
    if (response.ok) {
      console.log('Wynik zapisany na serwerze');
    }
  });

  resetButton();
});

function startTest() {
  resultDiv.textContent = '';
  timer.textContent = '';

  reactionButton.disabled = true;
  const randomDelay = Math.floor(Math.random() * 10000) + 1000;

  let countDown = randomDelay / 1000;
  const countdownInterval = setInterval(() => {
    timer.textContent = `Czas do kliknięcia: ${countDown.toFixed(2)}`; 
    countDown -= 0.1;
    if (countDown <= 0) {
      clearInterval(countdownInterval);
      timer.textContent = 'Kliknij teraz!';
      startTime = new Date().getTime();
      reactionButton.disabled = false; 
    }
  }, 100);

  timerTimeout = setTimeout(() => {
    if (!reactionButton.disabled) {
      resultDiv.textContent = 'Za późno! Próbuj ponownie.';
      resetButton();
    }
  }, randomDelay + 1000);
}

function resetButton() {
  reactionButton.disabled = true;
  setTimeout(() => {
    reactionButton.disabled = false;
    reactionButton.textContent = 'Czekaj na kliknięcie';
    startTest();
  }, 2000);
}

startTest();
