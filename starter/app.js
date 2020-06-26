/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer;
const players = [0, 1];

// init diceDOM selector
const diceDOM = document.querySelector('.dice');
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  // Random Number
  let dice = Math.floor(Math.random() * 6) + 1;

  // Display Result
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // Update the round score IF the rolled number was NOT 1
  if (dice !== 1) {
    //add to current score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Next Player
    nextPlayer();
  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  // Add current score to the player's global score
  scores[activePlayer] += roundScore;
  
  // Update the UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
  
  // Check if player won the game!
  if (scores[activePlayer] >= 10) {
    // player won the game
    diceDOM.style.display = "none";
    document.querySelector('#name-' + activePlayer).textContent = "Winner!";
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    //Next player
    nextPlayer();
  }
  
});

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //delete current score (not global score)
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Handle styling for active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //Hide dice when switching players
  diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  for (let i = 0; i < players.length; i++) {
    document.getElementById('score-' + players[i]).textContent = '0';
    document.getElementById('current-' + players[i]).textContent = '0';
    document.getElementById('name-' + players[i]).textContent = 'Player ' + players[i];
  }
  diceDOM.style.display = 'none';
}
