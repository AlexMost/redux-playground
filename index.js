import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {counterListReducer, CounterListView} from './counter/counter_list'

const store = createStore(counterListReducer);

const render = () => {
  ReactDom.render(
    <CounterListView counters={store.getState()} store={store}/>,
    document.getElementById('container')
  );
};

store.subscribe(render);
render();