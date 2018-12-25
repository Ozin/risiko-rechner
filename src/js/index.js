'use strict'

import { h, app } from 'hyperapp'

import risk from './risk.js'

const state = {
  diceAttackers: [],
  diceDefenders: []
}

const actions = {
  playCompleteGame: _ => state => risk.playCompleteGame(state),
  playSingleGame: _ => state => risk.playSingleGame(state),
  set: value => value
}

document.getElementsByTagName('input')

const view = (state, actions) => (
  <main>
    <h2>Input</h2>
    <p>
      <label>Angreifer: </label>
      <input
        type="number"
        min="0"
        oninput={e => actions.set({ attackers: parseInt(e.target.value) })}
        value={state.attackers}
      />
    </p>
    <p>
      <label>Verteidiger: </label>
      <input
        type="number"
        min="0"
        value={state.defenders}
        oninput={e => actions.set({ defenders: parseInt(e.target.value) })}
      />
    </p>
    <p>
      <button onclick={actions.playSingleGame}>Einzelner Lauf</button>
    </p>
    <p>
      <button onclick={actions.playCompleteGame}>Bis zum Ende</button>
    </p>
    <h2>Letztes Würfelergebnis</h2>
    <p>Angreifer: {state.diceAttackers.join(' ')}</p>
    <p>Verteidiger: {state.diceDefenders.join(' ')}</p>
    <h2>Ergebnis</h2>
    <p>{state.result}</p>
  </main>
)

app(state, actions, view, document.body)
