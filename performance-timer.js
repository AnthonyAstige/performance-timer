'use strict';
/* global PT */

var timers = {
};
PT.start = function(name) {
	if (!timers[name]) {
		timers[name] = 0;
	}
	console.log('output');
};
PT.s = PT.start;
