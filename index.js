mport React from 'react';
import ReactDom from 'react-dom';
import {counterReducer, CounterView} from './counter';
import {createStore} from 'redux';

let id = 0;

const counterListReducer = (state = [], action) => {
  switch (action.type) {
  case 'add':
    id += 1;
    return [...state, counterReducer({id, count: 0}, action)];
  default:
    return state.map((c) => counterReducer(c, action));
  }
};

const store = createStore(counterListReducer);

const CounterListView = ({counters}) => (
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

const render = () => {
  ReactDom.render(
    <CounterListView counters={store.getState()}/>,
    document.getElementById('container')
  );
};

store.subscribe(render);
render();

