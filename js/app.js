//Création de mon tableau d'images

const cardsArray = [{
    'name' : 'mario',
    'img' : 'img/mario.jpg',},

{
    'name' : 'luigi',
    'img' : 'img/luigi.jpg',},

{
    'name' : 'peach',
     'img' : 'img/peach.jpg',},

{
    'name' : 'toad',
    'img' : 'img/toad.jpg',},
{
    'name' : 'warrio',
    'img' : 'img/warrio.jpg',},
    
{
    'name' : 'yoshi',
    'img' : 'img/yoshi.jpg',},
    
];
// Je fusionne mes tableaux
const gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
//Variables qui gère mes clicks
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
//Je céer mon jeu
const game = document.getElementById('game');
//je rajoute une sec
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
//J'insère ma sec ds la div game (pour kil soit enfant de game)
game.appendChild(grid);

//je fait l'itération ds mon tableau 
gameGrid.forEach(item => {
    const { name, img } = item;
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;
  
    const front = document.createElement('div');
    front.classList.add('front');
  
    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;
    //je créer ma cartes avec le rectoet verso
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

  });
    // Je met en place (Le fonctionnement du jeu)
    const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.add('match');
    });
  };

  const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.remove('selected');
    });
  };

  // (Ecouteur) click dans la grille
grid.addEventListener('click', event => {
    
    const clicked = event.target;
    // Test de la valeur de l'élément clické
    if (
      clicked.nodeName === 'SECTION' ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
      clicked.parentNode.classList.contains('match')
    ) {
      return;
    }
  
    // count est init à 0 par défaut
    if (count < 2) {
      // Ajout d'1 click
      count++;
      // Est-ce que c'est le 1er click
      if (count === 1) {
        // Récupère le nom de la card
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add('selected');
      } else {
        // C'est donc le 2nd choix
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add('selected');
      }
  
      // Test de correspondance
      // Est-ce qu'opn a clické sur 2 éléments
      if (firstGuess && secondGuess) {
        // Est-ce qu'ils sont les mêmes
        if (firstGuess === secondGuess) {
          // On les marquera comme correspondant
          setTimeout(match, delay);
        }
        // Quelque soit le résultat (OK/KO)
        // on réinitialise les cartes, pour un nouveau coups
        setTimeout(resetGuesses, delay);
      }
      // Stockage du 1er choix pour aider à la comparaison lors du 2nd choix
      previousTarget = clicked;
    }
  
  });
  //Mon compteur de coup et scors
const movesCounter = document.getElementById('moves-counter');
const scoreCounter = document.getElementById('moves-score');
let score = 0;
let numberOfTries = 0
// ...

function updateGameStats() {
  movesCounter.textContent = numberOfTries;
  scoreCounter.textContent = score;
}

// ...
grid.addEventListener('click', () => {
  numberOfTries++;
  updateGameStats();

  // ...

  if (firstGuess === secondGuess) {
    score += 10;
    updateGameStats();

    // ...
  } else {
    score -= 5;
    updateGameStats();

  }
});
