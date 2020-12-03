//loome klassi ja konstruktori, mille parameetriteks on arvatav sõna ja olemasolevate pakkumiste arv.

class Hangman {
    constructor(word, remainingGuesses){
        this.word = word.toLowerCase().split('');
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.status = 'playing';
    }
    //vaatame, kas pakutud täht on meie otsitavas sõnas olemas ja õige arvamise puhul lisame arvatud tähtede listi
    get puzzle() {
        let puzzle = '';
        this.word.forEach((letter) => {
        if (this.guessedLetters.includes(letter) || letter === ' '){
            puzzle += letter;
        } else {
            //kui ei ole, kaotab elu
            puzzle += '*' 
        }
        })
        return puzzle;
    }

    makeGuess (guess){
        guess = guess.toLowerCase();
        const isUnique = !this.guessedLetters.includes(guess);
        const isBadGuess = !this.word.includes(guess);
        
    //kontrollime, kas elusid veel on
    if (this.status !== 'playing'){
        return
    }
        //kontrollime, kas pakutud täht on unikaalne
        if (isUnique){
            this.guessedLetters.push(guess)
        }
        //kontrolle, kas pakutud täht on unikaalne ja varasemalt pakkumata
        if (isUnique && isBadGuess){
            this.remainingGuesses--
        }
        this.calculateStatus();
    }
    //kontrollime, kas elusid veel on ning anname tagasisidet kasutajale elude ja pakutud tähtede kohta
    get statusMessage(){
        if (this.status === 'playing'){
            return `Elusid: ${this.remainingGuesses}`
        } else if (this.status === 'failed') {
            return `Ei! Õige oli "${this.word.join('')}" `
        } else {
            return 'Tubli! Arvasid ära!'
        }
    }
    //loeme kasutaja pakkumiste arvu
    calculateStatus(){
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')
        
        if (this.remainingGuesses === 0){
            this.status = 'failed'
        } else if (finished){
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }

}
