'use strict';
/* global Package */

Package.describe({
  summary: 'A simple performance timer',
  version: '0.0.1',
  name:'anthonyastige:performance-timer',
  git:'git@github.com:AnthonyAstige/performance-timer.git'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.3');

	api.addFiles([
		'export.js',
		'performance-timer.js'
	]);

	api.export('PT');
});
