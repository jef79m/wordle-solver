import DataListInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';

interface WordInputProps {
    suggestions: Array<string>,
}

function WordInput(props: WordInputProps) {
    const { suggestions } = props;
    const suggestedOptions = suggestions.map((x) => {return {id: x, value: x} });
    
    return ( 
        <div className="flex justify-center">
            <DataListInput
                placeholder='Enter word or choose a suggestion'
                label="Attempted Word"
                onSelect={(item) => console.log('Selected ' + item.value)}
                items={suggestedOptions}
            />
        </div>
     );
}

const styles = {

}
export default WordInput;