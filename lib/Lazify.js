/*
 * Lazify
 * https://github.com/wwalser/lazify
 *
 * Copyright (c) 2013 Wesley Walser
 * Licensed under the GPL license.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(root){
	var lazify;

	lazify = function(orig, config){
		var chain = [],
			createChainable, chainableFunc;

		config = config || [];
		createChainable = function(name){
			return function chainable(){
				chain.push({name: name, context: this, args: arguments});
				return chainableFunc;
			};
		};

		chainableFunc = createChainable();
		for (var i = 0, configLength = config.length; i < configLength; i++){
			chainableFunc[config[i]] = createChainable(config[i]);
		}

		chainableFunc.exec = function(){
			var length = chain.length,
				currentRet = orig,
				current, i;
			for (i = 0, length = chain.length; i < length; i++){
				current = chain[i];
				if (current.name) {
					currentRet = currentRet[current.name].apply(current.context, current.args);
				} else {
					currentRet = currentRet.apply(current.context, current.args);
				}
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

