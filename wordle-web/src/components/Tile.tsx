import {useEffect, useState} from "react";
import * as React from "react";

interface TileProps {
    letter: string,
    status: string,
    onUpdate: (letter: string, status: string) => void,
}

export default function Tile(props: TileProps) {
    const [status, setStatus] = useState<string>(props.status)
    const colors: { [name: string]: string } = {
        bad: 'bg-gray-300',
        not: 'bg-yellow-400',
        perfect: 'bg-green-500',
    }

    useEffect(() => {
        props.onUpdate(props.letter, status);
    }, [status])

    const handleCLick = () => {
        switch (status) {
            case 'bad': {
                setStatus('not');
                break;
            }
            case 'not': {
                setStatus('perfect');
                break;
            }
            case 'perfect': {
                setStatus('bad');
                break;
            }
        }
    }

    return (
        <div onClick={handleCLick} className={`w-14 h-14 flex justify-center align-middle rounded ${colors[status]}`}>
            <span className={"text-4xl uppercase pt-2"}>{props.letter}</span>
        </div>
    )
}