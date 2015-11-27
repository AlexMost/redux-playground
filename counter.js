mport React from 'react';


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

export const CounterView = ({value, onInc, onDec}) => (
   <li>
     <h1>{value.count}</h1>
     <button onClick={onInc}>+</button>
     <button onClick={onDec}>-</button>
   </li>
);


