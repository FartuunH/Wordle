
//grab the html elements
const wordEl = [...document.querySelectorAll('#rows> div')];
const playAgainBtn = document.querySelector('button');

// const the hidden words 
const hiddenWords = ['berry', 'orange', 'panana', 'lime',
'kiwi', 'apple', 'grape', 'mango',]

const randomIndex = Math.floor(Math.random() * hiddenWords.length);
const targetWords = hiddenWords[randomIndex].toLocaleUpperCase();
let guessedWord = Array(targetWords.length).fill('-----')
let raimanningAttempts = 5;


// get the elements from the HTMl by getelementbyId

// define the list of the words of the Game 


// let the player know how many attempts they can 
// play at once 


// const to store the game state

// select or bulid how to select random Words 


// bulid the underscores or the hidden part of the
// game so the player can guess

// build the play button again to reset  the game 


// function to for the random Number


// function for the current word state 


// functin to display don't give message 

// function to look if the player guess was correct 


// function to look if the player loss the guess 
// or attemp is Ended 

// function to end the game if the condition is meed
// if the player has won or has run out of attempts

// function to congratulate the player












