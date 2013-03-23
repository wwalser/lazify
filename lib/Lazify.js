/*
 * Lazify
 * https://github.com/wwalser/lazify
 *
 * Copyright (c) 2013 Wesley Walser
 * Licensed under the GPL license.
 */

(function(root){
	var lazify;

	lazify = function(orig){
		var chain = [];
		var chainableFunc = function(){
			chain.push({context: this, args: arguments});
			return chainableFunc;
		};
		chainableFunc.exec = function(){
			var length = chain.length,
				currentRet = orig,
				current, i;
			for (i = 0, length = chain.length; i < length; i++){
				current = chain[i];
				currentRet = currentRet.apply(current.context, current.args);
			}
			return currentRet;
		};
		
		return chainableFunc;
	};

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = lazify;
	} else {
		root['lazify'] = lazify;
	}
}(this));

