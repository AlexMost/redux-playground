import React from 'react';
import {initActionStream} from '../redux-signal';

export const counterMailbox = initActionStream((signal) => {
  const delayedInc = signal
    .filter(({type}) => type === 'inc')
    .delay(1000)
    .map(({id}) => ({type: 'incr', id}))

  return [delayedInc]
});

export const counterReducer = (state, action) => {
  if(action.id !== state.id) {
    return state;
  }

  switch (action.type) {
  case 'decr':
    return Object.assign(state, {count: state.count - 1});
  case 'incr':
    return Object.assign(state, {count: state.count + 1});
  default:
    return state;
  }
};

export const CounterView = ({value, onInc, onDec, signal}) => (
   <li>
     <h1>{value.count}</h1>
     <button onClick={onInc}>+</button>
     <button onClick={onDec}>-</button>
     <button onClick={() => counterMailbox.send({id: value.id, type: "inc"})}>
      +++
     </button>
   </li>
);


