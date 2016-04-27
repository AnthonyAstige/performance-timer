'use strict';
/* global PT */

var timers = {};

function addTimerIfMissing(name) {
	if (!timers[name]) {
		timers[name] = {
			starts: 0,
			stops: 0,
			totalTime: 0
		};
	}
}

function getTime() {
	// TODO: Make work on node, references:
	// TODO: * http://stackoverflow.com/a/18197438/4747661
	// TODO: * Perhaps using https://github.com/Krb686/nanotimer
	return window.performance.now();
}

function outputTimer(name) {
	console.log(timers[name]);
}

PT.start = function(name = 'default') {
	// Setup
	addTimerIfMissing(name);
	var lastStarted = timers[name].lastStarted;

	// Save information
	if (lastStarted) {
		timers[name].totalTime += getTime() - lastStarted;
	}
	timers[name].starts++;
	timers[name].lastStarted = getTime();
};

PT.stop = function(name = 'default') {
	// Setup
	addTimerIfMissing(name);
	var lastStarted = timers[name].lastStarted;

	// Save information
	timers[name].stops++;
	timers[name].totalTime += getTime() - lastStarted;
	timers[name].lastStarted = false;

	// Output
	outputTimer(name);
};

// Shorthand method aliases
PT.a = PT.start;
PT.z = PT.stop;
