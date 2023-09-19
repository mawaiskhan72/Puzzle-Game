var timer;
var timeLeft = 30;
var gameWon = false;

function updateCountdown() {
  var timerElement = document.getElementById("timer");
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    timerElement.textContent = "00:00";
    if (!gameWon) {
      alert("You lose!");
    }
  } else {
    timeLeft--;
  }
}

function shufflePuzzlePieces() {
  const container = document.querySelector('.container');
  const puzzlePieces = Array.from(container.children);
  puzzlePieces.sort(() => Math.random() - 0.5);
  puzzlePieces.forEach((piece) => container.appendChild(piece));
}

function checkWin() {
  const buttons = document.querySelectorAll('.container .box');
  const sortedButtons = Array.from(buttons).map((button) => parseInt(button.textContent));
  sortedButtons.sort((a, b) => a - b);

  for (let i = 0; i < buttons.length; i++) {
    if (parseInt(buttons[i].textContent) !== sortedButtons[i]) {
      return false;
    }
  }

  return true;
}

function showMessage(message) {
  var messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

window.onload = function () {
  updateCountdown();
  shufflePuzzlePieces();
  timer = setInterval(updateCountdown, 1000);
};

document.getElementById("tryAgainButton").onclick = function () {
  clearInterval(timer);
  timeLeft = 30;
  updateCountdown();
  timer = setInterval(updateCountdown, 1000);
  shufflePuzzlePieces();
  gameWon = false;
  showMessage("");
};

let draggedButton = null;

const buttons = document.querySelectorAll('.container .box');

buttons.forEach((button) => {
  button.addEventListener('dragstart', (event) => {
    if (timeLeft > 0) {
      draggedButton = event.target;
    }
  });

  button.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  button.addEventListener('drop', (event) => {

    if (!gameWon && draggedButton !== null && draggedButton !== event.target) {
      const temp = event.target.textContent;
      event.target.textContent = draggedButton.textContent;
      draggedButton.textContent = temp;
      
      if (checkWin()) {
        gameWon = true;
        clearInterval(timer);
        alert("You win!");
      }

    }

    draggedButton = null;
  });
});
