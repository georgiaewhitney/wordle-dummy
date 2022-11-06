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

// allows us to add keypress to the grid
const guessGrid = document.querySelector("[data-guess-grid]");

// this allows us to start, so that we can also stop the game as win may occur before grid ends
const startGame = () => {
  document.addEventListener("click", toClickMouse);
  document.addEventListener("keydown", toPressKey);
};

const stopGame = () => {
  document.removeEventListener("click", toClickMouse);
  document.removeEventListener("keydown", toPressKey);
};

const toClickMouse = (x) => {
  if (x.target.matches("[data-key]")) {
    pressKey(x.target.dataset.key);
    return;
  }

  if (x.target.matches("[data-enter]")) {
    takeGuess();
    return;
  }

  if (x.target.matches("[data=delete]")) {
    backspace();
    return;
  }
};

const toPressKey = (x) => {
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
    pressKey(x.key);
    return;
  }
};

// this will find the first .tile that doesn't have a letter (data) and insert the letter (data) there
// as querySelector always finds the first thing it matches
const keyPress = (key) => {
  const nextTile = guessGrid.querySelector(":not([data-letter])");
  nextTile.dataset.letter = key.toUpperCase(); // i think this is matching the dictionary
  nextTile.textContent = key; // sets the text equal to the key
  nextTile.dataset.state = "active"; // gives the bg colour
};

startGame();

// game was not responding because I hadn't logged the press to the console. It is now appearing
