//loome uue mängu
let game1

//loome 2 div-i.
const puzzleDIV = document.querySelector('#puzzle');
const remainingDIV = document.querySelector('#guesses');

//lisame JS eventi, mis tuvastab klaviatuuri vajutusi (pakkumisi)
window.addEventListener('keypress', (e) => {
    
    const guess = String.fromCharCode(e.charCode);
    game1.makeGuess(guess);
    render()
})

//anname kasutajale tagasisidet visuaalselt (kas täht on kasutatud ja tähe positsioon sõnas)
const render = () => {
    puzzleDIV.innerHTML = ''
    remainingDIV.textContent = game1.statusMessage;

    game1.puzzle.split('').forEach((letter) => {
        const letterEl = document.createElement('span')
        letterEl.textContent = letter
        puzzleDIV.appendChild(letterEl)
    })
}

//loome uue mängu
const startGame = async () => {
    //väljasid on 1 (sõnu), saab ka juurde lisada, et tekitada sõnade asemele lauseid
    const puzzle = await getPuzzle('1')
    //elusid ehk pakkumisi on 5
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()