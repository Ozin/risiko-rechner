'use strict'

const rollDice = _ => 1 + Math.floor(Math.random() * 6)
const rollDices = numDices =>
  [...Array(numDices)]
    .map(rollDice)
    .sort()
    .reverse()

const gameFinished = ({ attackers, defenders }) =>
  attackers <= 1 || defenders <= 0

const addResult = state => {
  if (gameFinished(state)) {
    const result =
      state.defenders <= 0
        ? 'Angreifer haben gewonnen'
        : 'Verteidiger haben gewonnen'

    return { ...state, result }
  } else {
    return state
  }
}

const playSingleGame = ({ attackers, defenders, ...rest }) => {
  if (gameFinished({ attackers, defenders })) {
    return { attackers, defenders, ...rest }
  }

  const numAttackerDices = Math.min(3, attackers - 1)
  const numDefenderDices = Math.min(2, defenders)

  const diceAttackers = rollDices(numAttackerDices)
  const diceDefenders = rollDices(numDefenderDices)

  for (let i = 0; i < Math.min(numAttackerDices, numDefenderDices); i++) {
    if (diceAttackers[i] > diceDefenders[i]) {
      defenders--
    } else {
      attackers--
    }
  }

  return addResult({ attackers, defenders, diceAttackers, diceDefenders })
}

const playCompleteGame = state => {
  if (gameFinished(state)) {
    return addResult(state)
  }

  return playCompleteGame(playSingleGame(state))
}

const risk = { playSingleGame, playCompleteGame }

export default risk
