import uuid from 'node-uuid';
import Rx from 'rx';

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export const createMailbox = (signalGraphInit) => {
	const signalID = uuid();
	let subject;

	const init = (signal) => {
		subject = signal;
		const filteredSignal = signal
			.filter(({_signalID}) => _signalID === signalID)
		return signalGraphInit(filteredSignal);
	}

	const send = (message) => {
		subject.onNext(Object.assign(message, {_signalID: signalID}));
	}

	return {init, send}
}

export const composeMailboxes = (...mailboxes) => {
	return mailboxes;
}

export const createSignalGraph = (...mailboxes) => {
	const subject = new Rx.Subject();
	const signals = Rx.Observable.merge(
		flatten(flatten(mailboxes).map((mailbox) => mailbox.init(subject))));
	return signals;
}


