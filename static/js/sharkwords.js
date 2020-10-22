const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const WORDS = [
  "strawberry",
  "orange",
  "apple",
  "banana",
  "pineapple",
  "kiwi",
  "peach",
  "pecan",
  "eggplant",
  "durian",
  "peanut",
  "chocolate",
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  for (const char of word) {
    $("#word-container").append(`<div class="letter-box ${char}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    $("#letter-buttons").append(`<button>${letter}</button>`);
  }
};

const disableLetterButton = (buttonEl) => {
  const button = $(buttonEl);
  button.attr("disabled", "true");
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  const char = $(`.${letter}`);
  //$() => always return an object ex) {} or {w, w}
  //if(char) => that's always going to be true even if the letter is not in word
  return char[0] !== undefined;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  $(`.${letter}`).html(`<div class="letter-box ${letter}">${letter}</div>`);
};

// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

  $("#shark-img img").attr("src", `/static/images/guess${numWrong}.png`);

  if (numWrong >= 5) {
    const buttons = document.querySelectorAll("button");
    for (const btn of buttons) {
      disableLetterButton(btn);
    }
    $("#play-again").show();
  }
};

// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  window.location = "/sharkwords";
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = "hello";

  createDivsForChars(word);
  generateLetterButtons();

  $("button").on("click", (evt) => {
    const clickedBtn = $(evt.target);
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $("#play-again").on("click", () => {
    resetGame(startGame);
  });
})();
