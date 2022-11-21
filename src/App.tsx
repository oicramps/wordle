import Grid from './components/Grid'
import GameProvider from './contex/gameContext'

import './styles.scss'

function App() {
  return (
    <GameProvider>
      <div className='main'>
        <Grid />
      </div>
    </GameProvider>
  )
}

export default App
