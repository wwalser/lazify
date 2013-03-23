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

