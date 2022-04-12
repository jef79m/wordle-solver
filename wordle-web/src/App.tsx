import './App.css'
import './index.css'
import WordInput from './components/WordInput'
import {useEffect, useState} from 'react';
import {WordRow} from './components/WordRow';
import {wordList} from './data/wordle_sorted';
import getSuggestions from "./wordle";

interface Word {
    letters: string[],
    status: string[],
    word: string,
}

function App() {
    const [words, setWords] = useState<Array<Word>>([]);
    const [badLetters, setBadLetters] = useState<string[]>([]);
    const [notLetters, setNotLetters] = useState<string[][]>([[], [], [], [], []]);
    const [perfectLetters, setPerfectLetters ] = useState<string[]>([]);
    const [suggestions, setSuggestions ] = useState<string[]>([]);

    useEffect(() => {
        setSuggestions(getSuggestions(badLetters, notLetters, perfectLetters, wordList));
    }, [badLetters, notLetters, perfectLetters])

    useEffect(() => {
            const newBadLetters: string[] = [];
            const newNotLetters: string[][] = [[], [], [], [], []]
            const newPerfectLetters: string[] = ['', '', '', '', '']
            words.map((word) => {
                word.letters.map((letter, index) => {
                    if (word.status[index] == 'bad' && ! newBadLetters.includes(letter)) {
                        newBadLetters.push(letter)
                    } else if (word.status[index] == 'not') {
                        newNotLetters[index] = [...newNotLetters[index], letter]
                    } else if (word.status[index] == 'perfect') {
                        newPerfectLetters[index] = letter
                    }
                })
            })
            setBadLetters(newBadLetters);
            setNotLetters(newNotLetters);
            setPerfectLetters(newPerfectLetters);
        }, [words]
    )
    const handleAddWord = (newWord: string) => {
        const word = newWord.toLowerCase();
        const newStatus = ['bad', 'bad', 'bad', 'bad', 'bad'];
        word.split("").map((letter, index) => {
            if (perfectLetters[index] === letter) {
                newStatus[index] = 'perfect'
            } else if (notLetters.join('').includes(letter)) {
                newStatus[index] = 'not';
            }
        })
        setWords([...words, {word: word, letters: word.split(""), status: newStatus}]);
    }

    const handleWordChange = (index: number) => {
        return (status: string[]) => {
            const newWords = [...words];
            newWords[index] = {...newWords[index], status: status}
            setWords(newWords);
        }
    }

    return (
        <div className='flex flex-col h-screen max-w-2xl mx-auto'>
            <header className='align-self-start mb-10'>
                <h1 className="text-4xl md:text-6xl font-display text-center">Wordle Solver</h1>
            </header>

            <div className="w-3/4 mx-auto flex-grow mb-auto">
                {words.map((word, index) => {
                    return (
                        <WordRow key={word.word} word={word.word} status={word.status} onChange={handleWordChange(index)}/>
                    )
                })}
                <WordInput suggestions={suggestions} onGoButtonClick={handleAddWord}/>
            </div>

            <div className="text-center">
                <small>Made with 🍺 by jef79m</small>
            </div>
        </div>
    )
}

export default App
