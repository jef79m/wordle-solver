import './App.css'
import './index.css'
import WordInput from '@components/WordInput'

function App() {
  
  return (
    <div className='flex-column'>
    <header className='flex justify-center align-middle py-10'>
      
        <h1 className={"text-4xl font-display"}>Wordle Solver</h1>
      
    </header>
    <WordInput suggestions={['abort', 'beats', 'atone']}/>
    </div>
  )
}

export default App
