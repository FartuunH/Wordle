document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    let guesses = [[]];
    let space = 1;

    let word = "apple"
    let wordCount = 0;

    const rows = document.querySelectorAll('.the-rows button')


    function getWordArr() {
        const numberOfGuessed = guesses.length;
        return guesses[numberOfGuessed - 1]
    }

    function updateGuessed(letter) {
        const currentArr = getWordArr();

        if(currentArr && currentArr.length <5){
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


    function submitWord() {
        const currentArr = getWordArr()
        if(currentArr.length !== 5 ){
            window.alert("word must be 5 letter")
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
            window.alert("Congratulations! You guessed the word.");
        }

        if(guesses.length === 6) {
           
         window.alert(`Sorry, you have no more guesses! The word is ${word} \n\ refresh the page to play again`);
        }

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

            updateGuessed(letter);

        };   
    }
})