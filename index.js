import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {counterListReducer, CounterListView, listMailbox} from './counter/counter_list'
import {createActionStream} from './redux-signal';
import Rx from 'rx';


const store = createStore(counterListReducer);

const actionStream = createActionStream(listMailbox);

const render = () => {
  ReactDom.render(
    <CounterListView
    	counters={store.getState()}
    	dispatch={store.dispatch}/>,
    document.getElementById('container')
  );
};

actionStream.subscribe((action) => store.dispatch(action));

store.subscribe(render);

render();