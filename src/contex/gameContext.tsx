import { createContext, useCallback, useState } from 'react'

type GameContext = {
  guesses: string[][]
  handleSubmitGuess: (guess: string[]) => void
}

const defaultValues = {
  guesses: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleSubmitGuess: () => {},
}

export const GameContext = createContext<GameContext>(defaultValues)

const GameProvider = ({ children }: { children: JSX.Element }) => {
  const [guesses, setGuesses] = useState<string[][]>([])

  const handleSubmitGuess = useCallback((guess: string[]) => {
    setGuesses((prevGuesses) => [...prevGuesses, guess])
  }, [])

  return (
    <GameContext.Provider
      value={{
        guesses,
        handleSubmitGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider
