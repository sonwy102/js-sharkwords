const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector("#word-container");
  for (const char of word) {
    const letterBox = document.createElement('div');
    letterBox.classList.add("letter-box");
    letterBox.classList.add(`${char}`);
    wordContainer.append(letterBox);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {

  letterButton = document.querySelector("#letter-buttons");

  for (const letter of ALPHABET) {
    const button = document.createElement('button');
    button.innerText = `${letter}`;
    letterButton.append(button);
  }
    
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.setAttribute('disabled', 'true');
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {

  const char = document.querySelectorAll(`.${letter}`);
  return char[0] !== undefined;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const correctLetters = document.querySelectorAll(`.${letter}`);
  for (const guess of correctLetters) {
    guess.innerHTML =`${letter}`;
  }
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;
  sharkImg = document.querySelector('#shark-img img');
  sharkImg.setAttribute("src", `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    const buttons = document.querySelectorAll("button");
    for (const btn of buttons) {
      disableLetterButton(btn);
    }
    document.querySelector('#play-again').style.display = '';
  }
};

//  Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  document.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', (evt) => {
      const clickedBtn = evt.target;
      disableLetterButton(clickedBtn);

      const letter = clickedBtn.innerHTML;

      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter);
      } else {
        handleWrongGuess(letter);
      }
    });
  });

  document.querySelector('#play-again').addEventListener('click', () => {
    resetGame();
  });
})();
