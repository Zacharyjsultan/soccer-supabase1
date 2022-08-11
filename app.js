import { getGames, createGame } from './fetch-utils.js';
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');


const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

nameForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const data = new FormData(nameForm);

    name1 = data.get('team-one');
    name2 = data.get('team-two');

    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;

    nameForm.reset();
    displayCurrentGameEl();
});

teamOneAddButton.addEventListener('click', () => {
    score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    score1--;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    score2--;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async () => {
   
    const currentGameData = {
        name1: name1,
        name2: name2,
        score1: score1,
        score2: score2,
    };

    await createGame(currentGameData);

    displayAllGames();

    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});


window.addEventListener('', async () => {

    displayAllGames();
    
});

function displayCurrentGameEl() {
    currentGameEl.textContent = '';

    const gameEl = renderGame({ name1, name2, score1, score2 });
 
    currentGameEl.append(gameEl);
}

async function displayAllGames() {

    const pastGames = await getGames();
    pastGamesEl.textContent = '';
   

    // loop through the past games
    for (let game of pastGames) {
        
        const gameEl = renderGame (game.name1, game.name2, game.score1, game.score2);

        gameEl.classList.add('past');
        pastGamesEl.append(gameEl);
    }
    
    

}

displayCurrentGameEl();