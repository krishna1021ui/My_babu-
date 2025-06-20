const cardsArray = ['❤️','💛','💚','💙','💜','🧡','🤎','🖤'];
let gameGrid = [...cardsArray, ...cardsArray];
let firstCard = '', secondCard = '';
let lockBoard = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('puzzle-game').classList.remove('hidden');
  document.getElementById('bg-music').play();
  loadCards();
}

function loadCards() {
  gameGrid = shuffle(gameGrid);
  const board = document.getElementById('memory-game');
  board.innerHTML = '';
  gameGrid.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = '?';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.textContent !== '?') return;
  this.textContent = this.dataset.symbol;
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    firstCard = '';
    secondCard = '';
    lockBoard = false;
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      firstCard = '';
      secondCard = '';
      lockBoard = false;
    }, 800);
  }
}

function checkWin() {
  const unmatched = [...document.querySelectorAll('.card')].filter(c => c.textContent === '?');
  if (unmatched.length === 0) {
    document.getElementById('puzzle-game').classList.add('hidden');
    document.getElementById('congrats-screen').classList.remove('hidden');
  }
}

function startLoveSequence() {
  document.getElementById('congrats-screen').classList.add('hidden');
  document.getElementById('love-sequence').classList.remove('hidden');
  const messages = [
    'Love you 1',
    'Love you 10',
    'Love you 100',
    'Love you 1000',
    'Love you 10000',
    'Love you ♾️♾️',
    'Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh wiiiiiiiiiiiifffffffffffyyyyyyyyyy',
    'Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh paaattttnnniiii ggggg 💖🧿'
  ];
  let index = 0;
  const display = document.getElementById('messages');
  const interval = setInterval(() => {
    if (index < messages.length) {
      const div = document.createElement('div');
      div.classList.add('animate');
      div.textContent = messages[index++];
      display.appendChild(div);
    } else {
      clearInterval(interval);
    }
  }, 1000);
}
