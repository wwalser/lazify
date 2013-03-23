'use strict';

var lazify = require('../lib/Lazify.js');

exports['lazify'] = {
	setUp: function(done) {
		// setup here
		done();
	},
	'returns a function': function(test) {
		test.expect(1);
		test.equal(typeof lazify({}), 'function', 'Great success!');
		test.done();
	},
	'execs the number of functions chained': function(test) {
		//will make 3 test calls
		test.expect(3);
		var expectation = function(){
			test.ok(true);
			return expectation;
		};
		//make 3 test calls then exec
		lazify(expectation)()()().exec();
		test.done();		
	},
	'implementation not called before exec': function(test) {
		test.expect(0);
		var expectation = function(){
			test.ok(true);
			return expectation;
		};
		//make 3 test calls but don't exec
		lazify(expectation)()()();
		test.done();
	},
	'exec returns result of chained calls': function(test) {
		test.expect(1);
		var numCalls = 0;
		var expectation = function(){
			numCalls++;
			return numCalls === 3 ? 'success' : expectation;
		};
		//make 3 test calls but don't exec
		var lazified = lazify(expectation)()()();
		test.equal(lazified.exec(), 'success', 'exec should return the result of the chain');
		test.done();
	},
};
