'use strict'

const rollDice = _ => 1 + Math.floor(Math.random() * 6)
const rollMultipleDices = numDices =>
  [...Array(numDices)]
    .map(rollDice)
    .sort()
    .reverse()

const getResult = ({ attackers, defenders }) => {
  if (defenders <= 0) {
    return 'Angreifer haben gewonnen'
  } else if (attackers <= 1) {
    return 'Verteidiger haben gewonnen'
  }
}

const playSingleGame = ({ attackers, defenders }) => {
  let result = getResult({ attackers, defenders })
  if (result) {
    return { attackers, defenders, result }
  }

  const numAttackerDices = Math.min(3, attackers - 1)
  const numDefenderDices = Math.min(2, defenders)

  const diceAttackers = rollMultipleDices(numAttackerDices)
  const diceDefenders = rollMultipleDices(numDefenderDices)

  for (let i = 0; i < Math.min(numAttackerDices, numDefenderDices); i++) {
    if (diceAttackers[i] > diceDefenders[i]) {
      defenders--
    } else {
      attackers--
    }
  }

  return {
    attackers,
    defenders,
    diceAttackers,
    diceDefenders,
    result: getResult({ attackers, defenders })
  }
}

const playCompleteGame = ({ attackers, defenders }) => {
  let result = { attackers, defenders }

  do {
    result = playSingleGame(result)
  } while (!result.result)

  return result
}

const risk = {
  playSingleGame,
  playCompleteGame
}

export default risk
