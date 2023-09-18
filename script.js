'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [,] ,currentScore, activePlayer, isWin;


Init();



function Init() {
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    isWin = false;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  
    player0El.classList.remove('player--winner', 'player--active');
    player1El.classList.remove('player--winner', 'player--active');
    player0El.classList.add('player--active');
  
    diceEl.classList.add('hidden');
}


function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}


function rollLogic() {
  if (!isWin) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } 
    else {
      switchPlayer();
    }
  }
}

function holdLogic() {
  if (!isWin) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      isWin = true; 
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } 
    else {
      switchPlayer();
    }
  }
}


btnRoll.addEventListener('click', rollLogic);
btnHold.addEventListener('click', holdLogic);
btnNew.addEventListener('click', Init);
