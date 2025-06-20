
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const winScreen = document.getElementById('winScreen');
const loveMessages = document.getElementById('loveMessages');

const emojis = ["❤️", "💛", "💚", "💙", "💜", "🧡", "🤍", "🩷"];
let cards = [...emojis, ...emojis]; cards = cards.slice(0, 25); // 25 cards for 5x5

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)];
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameScreen.innerHTML = "";
  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameScreen.appendChild(card);
  });
}

function flipCard(e) {
  const card = e.target;
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
    card.textContent = card.dataset.emoji;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 600);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedCards.push(card1, card2);
  } else {
    card1.textContent = "";
    card2.textContent = "";
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];

  if (matchedCards.length === cards.length) {
    setTimeout(() => {
      gameScreen.classList.add('hidden');
      winScreen.classList.remove('hidden');
    }, 500);
  }
}

startScreen.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  createBoard();
});

document.getElementById('nextButton').addEventListener('click', () => {
  winScreen.classList.add('hidden');
  loveMessages.classList.remove('hidden');
  showLoveMessages();
});

const messages = [
  "Love you 1",
  "Love you 10",
  "Love you 100",
  "Love you 1000",
  "Love you 10000",
  "Love you ♾️♾️",
  "Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh wiiiiiiiiiiiifffffffffffyyyyyyyyyy",
  "Lobbbbbbhhhhhhh uuuuuuuhhhhhhhh paaattttnnniiii ggggg 💖🧿"
];

function showLoveMessages() {
  loveMessages.innerHTML = "";
  messages.forEach((msg, index) => {
    const div = document.createElement('div');
    div.classList.add('love-message');
    div.style.animationDelay = `${index * 1.5}s`;
    div.textContent = msg;
    loveMessages.appendChild(div);
  });
}
