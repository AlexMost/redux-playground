import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {counterListReducer, CounterListView, listMailbox} from './counter/counter_list'
import {createSignalGraph} from './redux-signal';
import Rx from 'rx';


const store = createStore(counterListReducer);

const signals = createSignalGraph(listMailbox);

const render = () => {
  ReactDom.render(
    <CounterListView
    	counters={store.getState()}
    	dispatch={store.dispatch}/>,
    document.getElementById('container')
  );
};

signals.subscribe((action) => store.dispatch(action));

store.subscribe(render);

render();