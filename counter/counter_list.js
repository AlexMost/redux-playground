import React from 'react';
import {counterReducer, CounterView, signals} from './counter';

export const listSignals = (stream) => signals(stream);

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

export const CounterListView = ({counters, dispatch, signal}) => (
  <div>
    <ul>
      {counters.map((c) => (
        <CounterView
          key={c.id}
          signal={signal}
          value={c}
          onInc={() => dispatch({type: 'incr', id: c.id})}
          onDec={() => dispatch({type: 'decr', id: c.id})}
        />
      ))}
    </ul>
    <button onClick={() => dispatch({type: 'add'})}>Add</button>
  </div>
);
