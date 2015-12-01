import React from 'react';
import {counterReducer, CounterView, counterMailbox} from './counter';
import {mergeActionStreams, initActionStream} from '../redux-signal';

const mailbox = initActionStream((signal) => {
  const addSlow = signal
    .filter(({type}) => type === 'add_slow')
    .delay(1000)
    .map(() => ({type: 'add'}));
  return [addSlow]
});

export const listMailbox = mergeActionStreams(counterMailbox, mailbox)

let id = 0;

export const counterListReducer = (state = [], action) => {
  switch (action.type) {
  case 'add':
    id += 1;
    return [...state, counterReducer({id, count: 0}, action)];
  default:
    return state.map((c) => counterReducer(c, action));
  }
};

export const CounterListView = ({counters, dispatch}) => (
  <div>
    <ul>
      {counters.map((c) => (
        <CounterView
          key={c.id}
          value={c}
          dispatch={dispatch}
          onInc={() => dispatch({type: 'incr', id: c.id})}
          onDec={() => dispatch({type: 'decr', id: c.id})}
        />
      ))}
    </ul>
    <button onClick={() => dispatch({type: 'add'})}>Add</button>
    <button onClick={() => mailbox.send({type: 'add_slow'})}>Add Slow</button>
  </div>
);
