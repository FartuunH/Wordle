document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guesses = [[]];
    let space = 1;
    
    let wordCount = 0;
    let gameIsActive = true;

    const words = ["apple", "mango",  "lemon", "berry", "grape"];
    let word = getRandomWord()
    
    const newGameButton = document.getElementById("new-game-button"); // Added reference to the button


    const rows = document.querySelectorAll('.the-rows button')
     
     function getRandomWord() {
        return words[Math.floor(Math.random() * words.length)];
    }


    function getWordArr() {
        const Guessed = guesses.length;
        return guesses[Guessed - 1]
    }

    function updateGuessed(letter) {
        if (!gameIsActive) {
            return; 
        }
       
        const currentArr = getWordArr();

        

        if(currentArr && currentArr.length < 5){
            currentArr.push(letter)

            const SpaceEl = document.getElementById(String(space));
            space = space + 1;

            SpaceEl.textContent = letter;

            
        }
    

    }
    
    function getTileColor(letter, index) {
        const isCorrectL = word.includes(letter)

        if(!isCorrectL ){
            return "rgb(58, 58, 60)"
        }

        const letterInThatP = word.charAt(index)
        const isCorrectP = letter === letterInThatP

        if(isCorrectP) {
            return "rgb(83, 141, 78)";
        }
        return "rgb(181, 159, 59)"
    }

    function celebrate() {
        for (let i = 0; i < 10; i++) {
            const balloon = document.createElement("div");
            balloon.classList.add("balloon");
            balloon.style.left = `${Math.random() * 100}vw`;
            document.body.appendChild(balloon);
        }

        const balloons = document.querySelectorAll(".balloon");
        balloons.forEach((balloon) => {
            balloon.style.animationDuration = `${Math.random() * 2 + 1}s`;
            balloon.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;
            balloon.style.animationName = "balloonRise";
        });
    }


    function submitWord() {
        if (!gameIsActive) {
            return; 
        }
        const currentArr = getWordArr()
        const resultMessageElement = document.getElementById("result-message");
        const bodyElement = document.body;

        if(currentArr.length !== 5 ){
            resultMessageElement.textContent = "Word must be 5 letters";
            resultMessageElement.classList.add("animate__animated", "animate__fadeIn");
            
            setTimeout(() => {
                resultMessageElement.textContent = "";
                resultMessageElement.classList.remove("animate__animated", "animate__fadeIn");
            }, 8000);
            return;  

        }

        const currentWord = currentArr.join('')

        const firstLetterId = wordCount * 5 + 1;
        const interval = 200;
        currentArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index)

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style =`background-color:${tileColor};border-color:${tileColor}`;


            },interval * index)
        })

        wordCount += 1;


        if(currentWord === word) {
            resultMessageElement.textContent = "Congratulations! You guessed the word.";
            gameIsActive = false;
            celebrate(); 

        }

        else if(guesses.length === 6) {
           
            resultMessageElement.textContent = `Sorry, you have no more guesses! The word is ${word}. Refresh the page to play again.`;
            gameIsActive = false;

            bodyElement.classList.add("game-over");


        }
        resultMessageElement.classList.add("animate__animated", "animate__fadeIn");


        setTimeout(() => {
            resultMessageElement.textContent = "";
            resultMessageElement.classList.remove("animate__animated", "animate__fadeIn");
        }, 8000);

        guesses.push([])

    }


    function createSquares() {
        const gameBoard = document.getElementById("keyboard-board")
        for (let index = 0; index < 30; index++) {
           let square = document.createElement("div")
           square.classList.add("square")
           square.classList.add("animate_animated")
           square.setAttribute("id", index + 1)
           gameBoard.appendChild(square);
            
        }
       
    }

    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = ({ target }) => {
            const letter =  target.getAttribute("data-key")
            


            if(letter === 'Enter'){
                submitWord()
                return;
            }
            if (letter === 'del') {
                deleteLetter();
                return;
            }

            updateGuessed(letter);

        };   
    }

    function deleteLetter() {
        const currentArr = getWordArr();
    
        if (currentArr && currentArr.length > 0) {
            const lastLetter = currentArr.pop();
            const spaceEl = document.getElementById(String(space - 1));
            space = space - 1;
            spaceEl.textContent = '';
        }
    }

    function resetGame() {
        guesses = [[]];
        space = 1;
        word = getRandomWord();
        wordCount = 0;
        gameIsActive = true;

        clearBoard();

        
        resultMessageElement.textContent = "";
        bodyElement.classList.remove("game-over");

         enableLetterButtons();
    }

    newGameButton.addEventListener("click", resetGame);


    function clearBoard() {
        for (let index = 1; index <= 30; index++) {
            const letterEl = document.getElementById(index);
            letterEl.textContent = "";
            letterEl.style = ""; // Clear styles
            letterEl.classList.remove("animate__flipInX");
        }
    }

    function enableLetterButtons() {
        for (let i = 0; i < rows.length; i++) {
            rows[i].disabled = false;
        }
    }
    
    })