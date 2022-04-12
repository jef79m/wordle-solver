
const checkPerfect = (word:string[], perfectLetters:string[]) => {
    for (let index in perfectLetters) {
        const letter = perfectLetters[index]
        if (letter !== '' && word[index] !== letter) return false;
    }
    return true;
}

const checkBadLetters = (word: string[], badLetters: string[], perfectLetters: string[]) => {
    for (let index in word) {
        const letter = word[index];
        if (badLetters.includes(letter) && letter != perfectLetters[index]) return false;
    }
    return true;
}

const checkNotLetters = (word: string[], notLetters: string[][]) => {
    for (let index in word) {
        const letter = word[index];
        if (notLetters[index].includes(letter)) return false;
    }
    return true;
}

const getSuggestions = (badLetters: string[], notLetters: string[][], perfectLetters: string[], wordList: string[]) => {
    const goodLetters = notLetters.join("").split(",").join('').split('')
    const suggestions: string[] = [];
    console.log(badLetters, notLetters, perfectLetters, goodLetters);
    for (const word of wordList) {
        const wordLetters = word.split("");
        if (!checkPerfect(wordLetters, perfectLetters)) continue;
        if (!checkBadLetters(wordLetters, badLetters, perfectLetters)) continue;
        if (!checkNotLetters(wordLetters, notLetters)) continue;
        if (!goodLetters.every((letter: string) => wordLetters.includes(letter))) continue;
        suggestions.push(word);
        if (suggestions.length >= 3) break;
    }
    return suggestions;
}

export default getSuggestions;