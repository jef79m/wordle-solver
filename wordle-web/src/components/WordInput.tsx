import DatalistInput from 'react-datalist-input';
import {ChangeEvent, useState} from "react";

interface WordInputProps {
    suggestions: Array<string>,
    onGoButtonClick: (word: string) => void,
}

function WordInput(props: WordInputProps) {
    const {suggestions, onGoButtonClick} = props;
    const suggestedOptions = suggestions.map((x) => {
        return {id: x, value: x}
    });

    const [currentWord, setCurrentWord] = useState<string>("")

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentWord(event.target.value);
        console.log(currentWord);
    }

    const handleGoButtonClick = () => {
        if (currentWord != '') {
            onGoButtonClick(currentWord);
            setCurrentWord('');
        }
    }

    const onSelectHandler = (word: string) => {
        onGoButtonClick(word);
        setCurrentWord('');
    }

    return (
        <div className="flex justify-center">
            <DatalistInput
                className="w-3/4 h-12"
                label={""}
                showLabel={false}
                inputProps={{
                    className: "rounded-none rounded-l-full h-12",
                    maxLength: 5,
                }}
                value={currentWord}
                setValue={setCurrentWord}
                placeholder='Enter word or choose a suggestion'
                onSelect={(item) => onSelectHandler(item.value)}
                onChange={handleChange}
                items={suggestedOptions}
            />
            <button
                onClick={handleGoButtonClick}
                className="px-10 bg-lime-500 disabled:bg-gray-200 rounded-r-full"
                disabled={currentWord.length != 5}
            >GO</button>
        </div>
     );
}

const styles = {

}
export default WordInput;