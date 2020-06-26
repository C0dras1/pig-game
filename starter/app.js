/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*NEW FEATURES 
2. Add an input field to the HTML where players can set what the winning score will be. (HINT: you can read that value with the .value property in js.)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


let scores, roundScore, activePlayer, isGameRunning, prevRoll;
const players = [0, 1];
let winningScore = document.getElementById('score').value;

// init diceDOM selector
const diceDOM = document.querySelector('.dice');
// reset the game
init();
// HANDLE DICE ROLL LOGIC
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isGameRunning) {
    // Random Number
    let dice = Math.floor(Math.random() * 6) + 1;

    // Display Result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // Update the round score IF the rolled number was NOT 1
    if (dice !== 1 && prevRoll !== 6) {
      //add to current score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      //change prevScore to current dice
      prevRoll = dice;
    } else if (prevRoll === 6) {
        // check if dice equals prevRoll
        if (dice === prevRoll) {
          scores[activePlayer] = 0;
          document.querySelector('#score-' + activePlayer).textContent = 0;
          nextPlayer();
        } else {
          prevRoll = dice;
        }
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

// HANDLE HOLD LOGIC
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (isGameRunning) {
    // Add current score to the player's global score
    scores[activePlayer] += roundScore;
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    // Check if player won the game!
    if (scores[activePlayer] >= winningScore) {
      // player won the game
      diceDOM.style.display = "none";
      document.querySelector('#name-' + activePlayer).textContent = "Winner!";
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      //stop the game
      isGameRunning = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  //delete prevRoll 
  prevRoll = 0;
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
//HANDLE NEW GAME LOGIC
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isGameRunning = true;
  prevRoll = 0;

  for (let i = 0; i < players.length; i++) {
    document.getElementById('score-' + players[i]).textContent = '0';
    document.getElementById('current-' + players[i]).textContent = '0';
    document.getElementById('name-' + players[i]).textContent = 'Player ' + players[i];
    document.querySelector('.player-' + players[i] + '-panel').classList.remove('winner');
    document.querySelector('.player-' + players[i] + '-panel').classList.remove('active');
  }
  //add active class again to player 0
  document.querySelector('.player-0-panel').classList.add('active');

  diceDOM.style.display = 'none';
}
