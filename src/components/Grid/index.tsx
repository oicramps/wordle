import classNames from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import useGame from '../../hooks/useWordle'

import './styles.scss'

const ROWS_COUNT = 6

type RowProps = {
  guess: string[]
  active?: boolean
}

const Row = ({ guess, active = false }: RowProps) => {
  const { submitGuess } = useGame()
  const [tempGuess, setTempGuess] = useState<string[]>(guess)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key, event.key)
      switch (event.key) {
        case 'Enter':
          console.log(tempGuess)
          if (tempGuess.every((guess) => guess !== '')) submitGuess(tempGuess)
          else console.error('ERROR')
          break
        case 'Backspace':
          setTempGuess((prevGuess) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const indexToReplace = prevGuess.findLastIndex((guess) => !!guess)

            return prevGuess.map((guess, index) => (index === indexToReplace ? '' : guess))
          })
          break
        default:
          setTempGuess((prevGuess) => {
            const indexToReplace = prevGuess.findIndex((guess) => !guess)

            return prevGuess.map((guess, index) => (index === indexToReplace ? event.key : guess))
          })
      }
    },
    [submitGuess, tempGuess],
  )

  useEffect(() => {
    if (active) document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, handleKeyDown])

  return (
    <div
      className={classNames('grid__row', {
        'grid__row--active': active,
      })}
    >
      {tempGuess.map((char, index) => (
        <div
          key={index}
          className={classNames('grid__cell', {
            'grid__cell--filled': !!char,
            'grid__cell--success': false,
            'grid__cell--warning': false,
          })}
        >
          {char}
        </div>
      ))}
    </div>
  )
}

const Grid = () => {
  const { word, guesses } = useGame()

  console.log('guesses', guesses)

  const mapRow = (guess: string[], index: number) => (
    <Row key={index} guess={guess} active={index === 0} />
  )

  return (
    <div className='grid'>
      {guesses.map(mapRow)}
      {Array(ROWS_COUNT - guesses.length)
        .fill(['', '', '', '', ''])
        .map(mapRow)}
    </div>
  )
}

export default Grid
