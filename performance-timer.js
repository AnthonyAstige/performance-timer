'use strict';
/* global PT, EJSON, _ */

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
	if (typeof window === 'undefined') {
		// Node: https://nodejs.org/api/process.html#process_process_hrtime
		var [seconds, nanoseconds] = process.hrtime();
		return (seconds * 1000) + (nanoseconds / 1000000);
	}

	// Browser
	return window.performance.now();
}

function outputTimer(name) {
	// Make a copy of object for modification
	var log = EJSON.clone(timers[name]);

	if (log.starts === log.stops) {
		// Remove dupe info if not needed
		log.runs = log.stops;
		delete log.starts;
		delete log.stops;

		// Add average run time
		log.averageTime = Math.round(log.totalTime / log.runs);
	}

	// Remove lastStarted, we don't need it
	delete log.lastStarted;

	// Truncate totalTime
	log.totalTime = Math.round(log.totalTime);

	// Add timer name if it's not default
	if (name !== 'default') {
		log.name = name;
	}

	console.log(log);
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
