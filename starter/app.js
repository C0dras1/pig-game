/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach the set points on GLOBAL score wins the game

*/

/*NEW FEATURES 

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is 1. (HINT: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


let scores, roundScore, activePlayer, isGameRunning, prevRollTop, prevRollBottom;
const players = [0, 1];
let winningScore = document.getElementById('score').value;
let lastRoll = document.querySelector('.last-score');
// init diceDOM selector
const diceTopDOM = document.getElementById('diceTop');
const diceBottomDOM = document.getElementById('diceBottom');
// reset the game
init();
// HANDLE DICE ROLL LOGIC
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (isGameRunning) {
    // Random Number for both dice
    let diceTop = Math.floor(Math.random() * 6) + 1;
    let diceBottom = Math.floor(Math.random() * 6) + 1;
    lastRoll.textContent = 'Player ' + (activePlayer + 1) + ' just rolled a ' + diceTop + ' and a ' + diceBottom;
    console.log(diceTop, diceBottom);
    // Display Result for both dice
    diceTopDOM.style.display = 'block';
    diceTopDOM.src = 'dice-' + diceTop + '.png';
    diceBottomDOM.style.display = 'block';
    diceBottomDOM.src = 'dice-' + diceBottom + '.png';
    // Update the round score IF the rolled number was NOT 1
    if ((diceTop !== 1 && diceBottom !== 1) && (diceTop !== 6 && diceBottom !== 6)) {
      //add to current score
      roundScore += diceTop + diceBottom;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      //change prevScore to current dice
      prevRollTop = diceTop;
      prevRollBottom = diceBottom;
      console.log('first if statement')
    } else if (diceTop === 6 || diceBottom === 6) {
      // check if dice equals prevRoll
      if (prevRollTop === 6 || prevRollBottom === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        console.log('else if if statement')
        nextPlayer();
      } else if (diceTop === 1 || diceBottom === 1) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        console.log('else if else if statement')
        nextPlayer();
      } else {
        roundScore += diceTop + diceBottom;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        prevRollTop = diceTop;
        prevRollBottom = diceBottom;
        console.log('else if else statement')
      }
    } else {
      //Next Player
      console.log('else statement')
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
      diceTopDOM.style.display = "none";
      diceBottomDOM.style.display = "none";
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
  prevRollTop = 0;
  prevRollBottom = 0;
  //delete current score (not global score)
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Handle styling for active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //Hide dice when switching players
  diceTopDOM.style.display = 'none';
  diceBottomDOM.style.display = "none";
}
//HANDLE NEW GAME LOGIC
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  isGameRunning = true;
  prevRollTop = 0;
  prevRollBottom = 0;
  lastRoll.textContent = '';

  for (let i = 0; i < players.length; i++) {
    document.getElementById('score-' + players[i]).textContent = '0';
    document.getElementById('current-' + players[i]).textContent = '0';
    document.getElementById('name-' + players[i]).textContent = 'Player ' + (players[i] + 1);
    document.querySelector('.player-' + players[i] + '-panel').classList.remove('winner');
    document.querySelector('.player-' + players[i] + '-panel').classList.remove('active');
  }
  //add active class again to player 0
  document.querySelector('.player-0-panel').classList.add('active');

  diceTopDOM.style.display = 'none';
  diceBottomDOM.style.display = "none";
}
