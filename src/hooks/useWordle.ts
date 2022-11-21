import { useContext } from 'react'
import { GameContext } from '../contex/gameContext'

const WORD = 'EARTH'

const useGame = () => {
  const { guesses, handleSubmitGuess } = useContext(GameContext)

  return { word: WORD, guesses, submitGuess: handleSubmitGuess }
}

export default useGame
