import React from 'react';
import {counterReducer, CounterView} from './counter';

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

export const CounterListView = ({counters, store}) => (
  <div>
    <ul>
      {counters.map((c) => (
        <CounterView
          key={c.id}
          value={c}
          onInc={() => store.dispatch({type: 'incr', id: c.id})}
          onDec={() => store.dispatch({type: 'decr', id: c.id})}
        />
      ))}
    </ul>
    <button onClick={() => store.dispatch({type: 'add'})}>Add</button>
  </div>
);



