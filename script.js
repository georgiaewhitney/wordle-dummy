// small word list to enable limited game functionality
const wordList = [
  "APPLE",
  "BEAST",
  "CLICK",
  "DEVIL",
  "EMBER",
  "FORCE",
  "GREEN",
  "HUNTS",
  "ICING",
  "JAUNT",
  "KNEEL",
  "LAMBS",
  "MOUSE",
  "NIGHT",
  "OFFER",
  "PULSE",
  "QUEUE",
  "ROUSE",
  "SOUND",
  "TIMER",
  "UNDER",
  "VICES",
  "WANTS",
  "XENON",
  "YACHT",
  "ZONED",
];

// function below will render the choice here
// this doesn't randomise the answer with every call. only with start game
let answer = wordList[Math.floor(Math.random() * wordList.length)];
console.log(answer);

// function to grab a word from the wordList at random
/*
const answer = () => {
  let index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
};
*/
// allows us to add keypress to the grid
const guessGrid = document.querySelector("[data-guess-grid]");

// will help us select specific data keys
const keyboard = document.querySelector("[data-keyboard]");

// this allows us to start, so that we can also stop the game as win may occur before grid ends
const startGame = () => {
  document.addEventListener("click", toClickMouse);
  document.addEventListener("keydown", toKeyPress);
};

const stopGame = () => {
  document.removeEventListener("click", toClickMouse);
  document.removeEventListener("keydown", toKeyPress);
};

// allows us to use the onscreen keyboard
const toClickMouse = (x) => {
  if (x.target.matches("[data-key]")) {
    keyPress(x.target.dataset.key);
    return;
  }

  if (x.target.matches("[data-enter]")) {
    takeGuess();
    return;
  }

  if (x.target.matches("[data-delete]")) {
    backspace();
    return;
  }
};

// allows us to use device keyboard
const toKeyPress = (x) => {
  console.log(x);
  if (x.key === "Enter") {
    takeGuess();
    return;
  }

  if (x.key === "Backspace" || x.key === "Delete") {
    backspace();
    return;
  }

  if (x.key.match(/^[a-z]$/)) {
    keyPress(x.key);
    return;
  }
};

// this is finding the first element in the grid that does not have any letter (data/element) inside
// as querySelector always finds the first thing it matches, .tile will keep overriding the first tile
// it allows us to letter through the grid while playing
const keyPress = (key) => {
  const tilesInPlay = getTilesInPlay();
  if (tilesInPlay.length >= 5) return; // more than 5 is 'out of play'
  const nextTile = guessGrid.querySelector(":not([data-letter])");
  nextTile.dataset.letter = key.toUpperCase(); // i think this is matching the dictionary
  nextTile.textContent = key; // sets the text equal to the key
  nextTile.dataset.state = "active"; // gives the 'active' brighter tile indication
};

// with the keypress function, this ensures our submission is kept to those 5 tiles
// this function will be called in most game functionality as it centres our core data
const getTilesInPlay = () => {
  return guessGrid.querySelectorAll('[data-state="active"]');
};

// delete functionality
// finds the tiles in play, get the last tile that was active
// removes all data connected with that tile
const backspace = () => {
  const tilesInPlay = getTilesInPlay();
  const previousTile = tilesInPlay[tilesInPlay.length - 1]; // this gives us the last tile
  if (previousTile === null) return; // if there is nothing to delete, we don't need the function
  previousTile.textContent = ""; // sets it back to empty
  delete previousTile.dataset.state; // removes the state completely
  delete previousTile.dataset.letter; // removes the connection to that letter state
};

const takeGuess = () => {
  const tilesInPlay = [...getTilesInPlay()]; // need an array in order to .map() and .reduce()
  if (tilesInPlay.length !== 5) {
    alert("Answer not long enough"); // this should be a warning advising not enough letters
    return;
  }
  // grabbing our tiles and .reduce() returns a single value after iterating through the elements (tiles)
  const guess = tilesInPlay.reduce((word, tile) => {
    return word + tile.dataset.letter;
  }, "");
  console.log(guess);

  // alert indicating word not in dictionary - a different submission needed
  // this is really only helpful with larger dictionary
  /*
  if (!wordList.includes(guess)) {
    alert("Word not in array");
    return;
    */

  // stops from entering more letters
  stopGame();
  tilesInPlay.forEach((...params) => guessCheck(...params, guess));
};

const guessCheck = (tile, index) => {
  const letter = tile.dataset.letter; // checking how correct/incorrect is our answer
  const key = keyboard.querySelector(`[data-key="${letter}"]`); // grabbing the keys individually to apply the styles

  // applies the styles
  // the index of the answer is checked against the letter (data submitted)
  // the css is transformed to reflect that

  if (answer[index] === letter) {
    tile.dataset.state = "correct";
    key.classList.add("correct");
  } else if (answer.includes(letter)) {
    tile.dataset.state = "incorrect-location";
    key.classList.add("incorrect-location");
  } else {
    tile.dataset.state = "incorrect";
    key.classList.add("incorrect");
  }
};

/////////////////////////////

// this function can't be called before initialisation? so it's starting the game here
startGame();

// game was not responding because I hadn't logged the press to the console. It is now appearing
// for some reason startGame() refuses to be called before.
// it would help if i called my keyPress / keyPress function correctly
// delete button isn't working - typeError
