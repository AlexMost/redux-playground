import React from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';
import {counterListReducer, CounterListView, listSignals} from './counter/counter_list'
import Rx from 'rx';

const stream = new Rx.Subject();

const createSignalGraph = (stream, graph) => {
	const signals = graph(stream);
	return Rx.Observable.merge(signals);
}

const store = createStore(counterListReducer);

const signals = createSignalGraph(stream, listSignals);

const render = () => {
  ReactDom.render(
    <CounterListView
    	counters={store.getState()}
    	dispatch={store.dispatch} 
    	signal={stream}/>,
    document.getElementById('container')
  );
};

signals.subscribe((action) => store.dispatch(action));

store.subscribe(render);

render();