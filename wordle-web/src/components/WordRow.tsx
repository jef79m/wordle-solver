import * as React from 'react';
import {useEffect, useState} from "react";
import Tile from './Tile';

interface WordRowProps {
    word: string,
    onChange: (status: string[]) => void,
    status: string[],
}

export function WordRow(props: WordRowProps) {

    const [wordState, setWordState] = useState<Array<string>>(props.status);
    const [letters, setLetters] = useState<{letter: string, status:string}[]>([])

    useEffect(() => {
        props.onChange(wordState);
    }, [wordState])

    useEffect(() => {
        setLetters(props.word.split("").map((letter, index) => {
            return {letter: letter, status: wordState[index]}
        }))
    }, [props.status]);

    const handleUpdate = (index: number) => {
        return (letter: string, status: string) => {
            let newState = [...wordState];
            newState[index] = status;
            setWordState(newState);
        }
    }

    return (
        <div className={"flex justify-around my-5"}>
            {letters.map((letter, index) => {
                return (
                    <Tile key={index} {...letter} onUpdate={handleUpdate(index)}/>
                )
            })}

        </div>
    );
}